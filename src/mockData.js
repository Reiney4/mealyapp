const mockData = {
    products: [
      {
        id: 1,
        name: "Product A",
        price: 100,
        description: "This is product A",
        image: "path/to/imageA.jpg"
      },
      {
        id: 2,
        name: "Product B",
        price: 200,
        description: "This is product B",
        image: "path/to/imageB.jpg"
      },
      {
        id: 3,
        name: "Beef with rice",
        price: 150,
        description: "Delicious beef served with white rice.",
        image: "path/to/beefWithRice.jpg"
      },
      {
        id: 4,
        name: "Beef with fries",
        price: 170,
        description: "Juicy beef served with crispy fries.",
        image: "path/to/beefWithFries.jpg"
      }
    ],
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123" // In real applications, never store plain-text passwords!
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password456"
      }
    ],
    orders: [
      {
        id: 1,
        userId: 1,
        productIds: [1, 2],
        total: 300
      },
      {
        id: 2,
        userId: 2,
        productIds: [3, 4],
        total: 320
      }
    ],
    caterers: [
      {
        id: 1,
        name: "Caterer A",
        email: "catererA@example.com",
        password: "securePassword1" // Never store in plain-text in real apps!
      },
      {
        id: 2,
        name: "Caterer B",
        email: "catererB@example.com",
        password: "securePassword2"
      }
    ],
    dailyMenus: [
      {
        id: 1,
        date: "2023-10-23",
        mealOptions: [1, 2, 3],
        catererId: 1
      },
      {
        id: 2,
        date: "2023-10-24",
        mealOptions: [2, 4],
        catererId: 2
      }
    ],
    orderHistory: [
      // This can be derived from the orders based on timestamps, or you can explicitly save past orders here.
    ],
    notifications: [
      {
        id: 1,
        userId: 1,
        message: "The menu for today has been set!"
      },
      {
        id: 2,
        userId: 2,
        message: "The menu for today has been set!"
      }
    ]
  };
  
  export default mockData;
  