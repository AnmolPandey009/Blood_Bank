CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_id INT NOT NULL,
    units_requested INT NOT NULL,
    request_date DATE NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    fulfilled_by INT,
    FOREIGN KEY (recipient_id) REFERENCES recipients(id) ON DELETE CASCADE,
    FOREIGN KEY (fulfilled_by) REFERENCES users(id) ON DELETE SET NULL
);
