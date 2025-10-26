const { pool } = require('../config/database');

// Get all issues
const getAllIssues = async (req, res) => {
  try {
    const [issues] = await pool.execute(`
      SELECT bi.*, 
             br.patient_id,
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name,
             h.hospital_name
      FROM blood_issues bi
      JOIN blood_requests br ON bi.request_id = br.id
      JOIN patients p ON br.patient_id = p.id
      JOIN hospitals h ON bi.hospital_id = h.id
      ORDER BY bi.issue_date DESC
    `);

    res.json({
      success: true,
      data: issues
    });
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get issue by ID
const getIssueById = async (req, res) => {
  try {
    const { issueId } = req.params;

    const [issues] = await pool.execute(`
      SELECT bi.*, 
             br.patient_id,
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name,
             h.hospital_name
      FROM blood_issues bi
      JOIN blood_requests br ON bi.request_id = br.id
      JOIN patients p ON br.patient_id = p.id
      JOIN hospitals h ON bi.hospital_id = h.id
      WHERE bi.id = ?
    `, [issueId]);

    if (issues.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.json({
      success: true,
      data: issues[0]
    });
  } catch (error) {
    console.error('Get issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get issues by request
const getIssuesByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const [issues] = await pool.execute(`
      SELECT bi.*, h.hospital_name
      FROM blood_issues bi
      JOIN hospitals h ON bi.hospital_id = h.id
      WHERE bi.request_id = ?
      ORDER BY bi.issue_date DESC
    `, [requestId]);

    res.json({
      success: true,
      data: issues
    });
  } catch (error) {
    console.error('Get issues by request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create blood issue
const createIssue = async (req, res) => {
  try {
    const issueData = req.body;
    const userId = req.user.id;

    // Get hospital ID for current user
    const [hospitalData] = await pool.execute(
      'SELECT id FROM hospitals WHERE user_id = ?',
      [userId]
    );

    if (hospitalData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Hospital profile not found'
      });
    }

    const hospitalId = hospitalData[0].id;

    // Check if request exists and is approved
    const [requests] = await pool.execute(
      'SELECT id, status, units_requested FROM blood_requests WHERE id = ?',
      [issueData.request_id]
    );

    if (requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }

    if (requests[0].status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Request must be approved before issuing blood'
      });
    }

    // Check if blood is available in inventory
    const [inventory] = await pool.execute(
      'SELECT id, units_available FROM blood_inventory WHERE hospital_id = ? AND blood_group = ? AND status = "available"',
      [hospitalId, issueData.blood_group]
    );

    if (inventory.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Blood not available in inventory'
      });
    }

    if (inventory[0].units_available < issueData.units_issued) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient blood units in inventory'
      });
    }

    // Create blood issue
    const [result] = await pool.execute(`
      INSERT INTO blood_issues (
        request_id, hospital_id, blood_group, units_issued, 
        issued_to, issued_by, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      issueData.request_id,
      hospitalId,
      issueData.blood_group,
      issueData.units_issued,
      issueData.issued_to,
      issueData.issued_by,
      issueData.notes || null
    ]);

    const issueId = result.insertId;

    res.status(201).json({
      success: true,
      message: 'Blood issued successfully',
      data: { id: issueId }
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get hospital issues
const getHospitalIssues = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get hospital ID for current user
    const [hospitalData] = await pool.execute(
      'SELECT id FROM hospitals WHERE user_id = ?',
      [userId]
    );

    if (hospitalData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Hospital profile not found'
      });
    }

    const hospitalId = hospitalData[0].id;

    const [issues] = await pool.execute(`
      SELECT bi.*, 
             br.patient_id,
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name
      FROM blood_issues bi
      JOIN blood_requests br ON bi.request_id = br.id
      JOIN patients p ON br.patient_id = p.id
      WHERE bi.hospital_id = ?
      ORDER BY bi.issue_date DESC
    `, [hospitalId]);

    res.json({
      success: true,
      data: issues
    });
  } catch (error) {
    console.error('Get hospital issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get issue statistics
const getIssueStats = async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_issues,
        SUM(units_issued) as total_units_issued,
        COUNT(DISTINCT request_id) as unique_requests_fulfilled,
        COUNT(DISTINCT hospital_id) as hospitals_involved
      FROM blood_issues
    `);

    // Get issues by blood group
    const [bloodGroupStats] = await pool.execute(`
      SELECT 
        blood_group,
        COUNT(*) as count,
        SUM(units_issued) as total_units
      FROM blood_issues 
      GROUP BY blood_group
      ORDER BY blood_group
    `);

    // Get recent issues (last 30 days)
    const [recentIssues] = await pool.execute(`
      SELECT bi.*, 
             br.patient_id,
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name,
             h.hospital_name
      FROM blood_issues bi
      JOIN blood_requests br ON bi.request_id = br.id
      JOIN patients p ON br.patient_id = p.id
      JOIN hospitals h ON bi.hospital_id = h.id
      WHERE bi.issue_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      ORDER BY bi.issue_date DESC
    `);

    res.json({
      success: true,
      data: {
        overall: stats[0],
        byBloodGroup: bloodGroupStats,
        recentIssues: recentIssues
      }
    });
  } catch (error) {
    console.error('Get issue stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get issues by date range
const getIssuesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const [issues] = await pool.execute(`
      SELECT bi.*, 
             br.patient_id,
             p.first_name as patient_first_name, 
             p.last_name as patient_last_name,
             h.hospital_name
      FROM blood_issues bi
      JOIN blood_requests br ON bi.request_id = br.id
      JOIN patients p ON br.patient_id = p.id
      JOIN hospitals h ON bi.hospital_id = h.id
      WHERE DATE(bi.issue_date) BETWEEN ? AND ?
      ORDER BY bi.issue_date DESC
    `, [startDate, endDate]);

    res.json({
      success: true,
      data: issues
    });
  } catch (error) {
    console.error('Get issues by date range error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getAllIssues,
  getIssueById,
  getIssuesByRequest,
  createIssue,
  getHospitalIssues,
  getIssueStats,
  getIssuesByDateRange
};
