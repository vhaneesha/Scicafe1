/* Mongo Shell Script */

db = connect("localhost:27017/scicafe");

db.users.drop()
db.events.drop()
db.programs.drop()
db.rewards.drop()
db.tag.drop()

//programs
programs = db.programs.insertMany([
  {
    name: "FYrE@ECST",
    fullName: "First-Year Experience Program at ECST",
    description: "Some description"
  },
  {
    name: "Program 2",
    fullName: "Program 2 fullName",
   
  },
  {
    name: "Program 3",
    fullName: "Program 3 fullName",
    description: "Some description3"
  }
]).insertedIds;
//users //password: "1234"
users = db.users.insertMany([
  {
    firstName: "Haneesha",
    lastName: "Vallamsetti",
    position: "Student",
    organisation: "Computer Science",
    username: "Haneesha",
    hash: "$2b$10$7.2qx1SNd.HKcBezKNs1BOSLcT7PGhTw0yy4X1ea.IxaDZfE1ns3O",
    email: "haneesha@gmail.com",
    enabled: true,
    isAdministrator: true,
    isEventOrganizer: false,
    isRewardProvider: false,
    program: programs[2]
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    position: "Faculty",
    organisation: "Computer Science",
    username: "Jane",
    hash: "$2b$10$7.2qx1SNd.HKcBezKNs1BOSLcT7PGhTw0yy4X1ea.IxaDZfE1ns3O",
    email: "jane@gmail.com",
    enabled: true,
    isAdministrator: false,
    isEventOrganizer: true,
    isRewardProvider: false,
    program: programs[1]
  },
  {
    firstName: "Joe",
    lastName: "Doe",
    position: "Student",
    organisation: "Electrical",
    username: "Jane",
    hash: "$2b$10$7.2qx1SNd.HKcBezKNs1BOSLcT7PGhTw0yy4X1ea.IxaDZfE1ns3O",
    email: "jdoe@gmail.com",
    enabled: true,
    isAdministrator: false,
    isEventOrganizer: false,
    isRewardProvider: false,
    program: programs[0]
  },
  {
    firstName: "Andy",
    lastName: "Smith",
    position: "Student",
    organisation: "Electrical",
    username: "Andy",
    hash: "$2b$10$7.2qx1SNd.HKcBezKNs1BOSLcT7PGhTw0yy4X1ea.IxaDZfE1ns3O",
    email: "andy@gmail.com",
    enabled: true,
    isAdministrator: false,
    isEventOrganizer: false,
    isRewardProvider: false,
    program: programs[0]
  }
]).insertedIds;

//events
events = db.events.insertMany([
  {
    name: "Event 1",
    description: "CS Event",
    location: "King Hall",
    starttime: "11/12/2018",
    endtime: "12/12/2018",
    submitter: users[2]
  },
  {
    name: "Event 2",
    description: "CS Event",
    location: "King Hall",
    starttime: "11/12/2018",
    endtime: "12/12/2018",
    reviewer: users[0],
    submitter: users[3],
    isapproved: true,
    attendees: [users[2], users[1]]
  },
]).insertedIds;






