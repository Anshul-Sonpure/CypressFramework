# _Cypress Automation Framework_

Welcome to the Cypress Automation Framework repository! This framework is designed to simplify and streamline your UI, API, and performance testing using Cypress, a powerful end-to-end testing framework.

## Installation and Setup

To get started with this framework, follow these steps:

### 1. Install Cypress

```bash
npm install cypress --save-dev
```
### 2. Install Cypress-XPath Plugin
Cypress-XPath is a useful plugin that enables you to use XPath selectors in your Cypress tests. Install it using npm:
```
npm install -D cypress-xpath
```
After installation, add the following line to your commands.js file (usually located in the "support" folder):
```
import 'cypress-xpath';
```
### Code Structure
This Cypress Automation Framework follows a structured approach for better maintainability and scalability. Below is an overview of the code structure:
### Comprehensive Testing
This framework is designed to support various testing types:

- UI Testing: UI tests are located under the e2e folder. Each test file typically follows the naming convention Test"pageclassname".cy.js, where "pageclassname" represents the page being tested.

- API Testing: API tests are located in the e2e/apiTest folder. These tests utilize the apiconfig.json file for endpoint configuration and the apiUtils.js utility functions for common API interactions.

- Performance Testing: This framework can be extended to include performance testing using Cypress performance plugins or custom scripts.For now we are capturing the time taken to perform actions on WEB UI.

### Folder Structure
- apiconfig.json: Contains the base URL and API endpoints for API testing.
- support: Contains utility files like apiUtils.js, which provides functions for common API interactions. These utilities are imported into API test files for reusability.

- reports: Stores test reports and screenshots generated during test execution.

- pageclass: Contains page class definitions for different web pages, making it easier to interact with web elements.

- logs: Logs generated during test execution are saved in this folder.

- fixtures: Test data in JSON format is stored here.

### Running Tests
To run all API tests, use the following command:
```
npm run apitest
```
To run all UI tests, use the following command:
```
npm run uitest
```
### Contributions and Feedback
Contributions and suggestions are welcome! If you find a bug or want to enhance the project, feel free to create a pull request. Please ensure your code follows best practices and includes appropriate tests.

Fork the repository.
- Create a new branch: git checkout -b feature/your-feature-name.
- Make changes and commit them: git commit -am 'Add new feature'.
- Push to the branch: git push origin feature/your-feature-name.
- Create a pull request.

### Note:
It seems to be some issue with the api hosted that I hosted on render,it works sometimes and sometimes not hence the api test cases fails.
You can use either your apiendpoints or you can change the url in apiconfig to - 
https://mobilestore-c8yg.onrender.com