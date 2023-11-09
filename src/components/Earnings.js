import React from 'react';


const Earnings = () => {
  return (
    <div>
      <header>
        <h1>Earnings Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {/* Add links to other admin-related pages */}
          </ul>
        </nav>
      </header>

      <main>
        {/* ... Other sections ... */}

        <section className="earnings-summary">
          <h3>Monthly Earnings Summary</h3>
          <div className="summary-card">
            <h4>November 2023</h4>
            <p>Total Earnings: $5,000.00</p>
            <p>Expenses: $1,200.00</p>
            <p>Net Earnings: $3,800.00</p>
          </div>
          {/* Add more summary cards for different months */}
        </section>

        <section className="earnings-details">
          <h3>Detailed Earnings</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Order ID</th>
                <th>Meal</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-11-01</td>
                <td>1</td>
                <td>Pizza</td>
                <td>2</td>
                <td>$20.00</td>
              </tr>
              <tr>
                <td>2023-11-02</td>
                <td>2</td>
                <td>Sushi</td>
                <td>4</td>
                <td>$35.00</td>
              </tr>
              {/* Add more rows for different orders */}
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Mealy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Earnings;