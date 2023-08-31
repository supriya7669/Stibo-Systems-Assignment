### Prerequisites

- Node.js and npm

Node: 18.17.1
Package Manager: npm 6.14.18

### Angular version

- This application was generated using Angular CLI
Angular CLI: 16.2.0

- All the components in the application are 'STANDALONE COMPONENTS' and do not required ngModule.
- Routing between components is achieved by window.location because Router Module have some issues with STANDALONE COMPONENTS and hence, router.navigate() was throwing some errors and need some time to
  R&D.
- However, the route params was accessed by using Angular's Activated Route service which is working fine with STANDALONE COMPONENTS.

### Installation

- Clone the repository
- Navigate to the project directory
- Install dependencies using "npm install"

### Run project

- Run the application using 'ng serve -o'

### Testing

- This project uses Karma as the test runner and Jasmine as the testing framework.
- Use "ng test --code-coverage" to run the test and generate code coverage.

### Styling

- SCSS is used for styling the elements
