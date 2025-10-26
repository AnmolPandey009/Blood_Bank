const { pool } = require('../config/database');

// Get all donors
const getAllDonors = async (req, res) => {
  try {
    const [donors] = await pool.execute(`
      SELECT d.*, u.email, u.created_at as user_created_at
      FROM donors d
      JOIN users u ON d.user_id = u.id
      WHERE u.is_active = true
      ORDER BY d.created_at DESC
    `);

    res.json({
      success: true,
      data: donors
    });
  } catch (error) {
    console.error('Get donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get donor by ID
const getDonorById = async (req, res) => {
  try {
    const { donorId } = req.params;

    const [donors] = await pool.execute(`
      SELECT d.*, u.email, u.created_at as user_created_at
      FROM donors d
      JOIN users u ON d.user_id = u.id
      WHERE d.id = ? AND u.is_active = true
    `, [donorId]);

    if (donors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    res.json({
      success: true,
      data: donors[0]
    });
  } catch (error) {
    console.error('Get donor error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get donors by blood group
const getDonorsByBloodGroup = async (req, res) => {
  try {
    const { bloodGroup } = req.params;

    const [donors] = await pool.execute(`
      SELECT d.*, u.email, u.created_at as user_created_at
      FROM donors d
      JOIN users u ON d.user_id = u.id
      WHERE d.blood_group = ? AND d.is_eligible = true AND u.is_active = true
      ORDER BY d.last_donation_date ASC
    `, [bloodGroup]);

    res.json({
      success: true,
      data: donors
    });
  } catch (error) {
    console.error('Get donors by blood group error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get current user's donor profile
const getDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [donors] = await pool.execute(`
      SELECT d.*, u.email, u.created_at as user_created_at
      FROM donors d
      JOIN users u ON d.user_id = u.id
      WHERE d.user_id = ?
    `, [userId]);

    if (donors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    res.json({
      success: true,
      data: donors[0]
    });
  } catch (error) {
    console.error('Get donor profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create donor profile
const createDonor = async (req, res) => {
  try {
    const userId = req.user.id;
    const donorData = req.body;

    // Check if donor profile already exists
    const [existingDonors] = await pool.execute(
      'SELECT id FROM donors WHERE user_id = ?',
      [userId]
    );

    if (existingDonors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Donor profile already exists'
      });
    }

    // Create donor profile
    const [result] = await pool.execute(`
      INSERT INTO donors (
        user_id, first_name, last_name, date_of_birth, gender, 
        blood_group, phone, address, emergency_contact, medical_history
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId,
      donorData.first_name,
      donorData.last_name,
      donorData.date_of_birth,
      donorData.gender,
      donorData.blood_group,
      donorData.phone,
      donorData.address,
      donorData.emergency_contact || null,
      donorData.medical_history || null
    ]);

    const donorId = result.insertId;

    res.status(201).json({
      success: true,
      message: 'Donor profile created successfully',
      data: { id: donorId }
    });
  } catch (error) {
    console.error('Create donor error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update donor profile
const updateDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donorData = req.body;
    const userId = req.user.id;

    // Check if donor exists and belongs to current user (or user is admin)
    const [donors] = await pool.execute(
      'SELECT user_id FROM donors WHERE id = ?',
      [donorId]
    );

    if (donors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    if (donors[0].user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update donor
    const updateFields = [];
    const updateValues = [];

    Object.keys(donorData).forEach(key => {
      if (donorData[key] !== undefined && donorData[key] !== null) {
        updateFields.push(`${key} = ?`);
        updateValues.push(donorData[key]);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    updateValues.push(donorId);

    await pool.execute(
      `UPDATE donors SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      updateValues
    );

    res.json({
      success: true,
      message: 'Donor profile updated successfully'
    });
  } catch (error) {
    console.error('Update donor error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete donor
const deleteDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const userId = req.user.id;

    // Check if donor exists and belongs to current user (or user is admin)
    const [donors] = await pool.execute(
      'SELECT user_id FROM donors WHERE id = ?',
      [donorId]
    );

    if (donors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donor not found'
      });
    }

    if (donors[0].user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Delete donor (cascade will handle related records)
    await pool.execute('DELETE FROM donors WHERE id = ?', [donorId]);

    res.json({
      success: true,
      message: 'Donor deleted successfully'
    });
  } catch (error) {
    console.error('Delete donor error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get donor statistics
const getDonorStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total donations
    const [donationStats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_donations,
        SUM(units_donated) as total_units,
        MAX(donation_date) as last_donation_date
      FROM blood_donations 
      WHERE donor_id = (SELECT id FROM donors WHERE user_id = ?)
    `, [userId]);

    // Get donation history
    const [donationHistory] = await pool.execute(`
      SELECT bd.*, h.hospital_name
      FROM blood_donations bd
      JOIN hospitals h ON bd.hospital_id = h.id
      WHERE bd.donor_id = (SELECT id FROM donors WHERE user_id = ?)
      ORDER BY bd.donation_date DESC
    `, [userId]);

    res.json({
      success: true,
      data: {
        stats: donationStats[0],
        history: donationHistory
      }
    });
  } catch (error) {
    console.error('Get donor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getAllDonors,
  getDonorById,
  getDonorsByBloodGroup,
  getDonorProfile,
  createDonor,
  updateDonor,
  deleteDonor,
  getDonorStats
};
