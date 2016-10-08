# Gruber
  > MVP for an on-demand grocery service's Shopper application + funnel analysis endpoint
  
## Getting Started

From within the root directory:
```sh
npm install
npm start
```

There is no need to spin up a local database, as this app currently points to a PostgreSQL db deployed on Heroku. The database is already populated with some sample data. 

Visit localhost on port 4568 to view the [Shopper Application landing page](http://localhost:4568/). The Applicant Analysis endpoint can be accessed at a link like [this one](http://localhost:4568/api/funnels.json?start_date=2014-01-01&end_date=2016-12-10)

## Going Forward

Below are a list of suggested enhancements if given more time
- Add testing suite, e.g., Mocha + Karma + Chai
- Make frontend responsive so that shoppers can easily apply from their phone's browser
- Add server-side form validation to protect against the malicious user and ensure compatibility
- Use React Router to manage navigation and Redux to manage state. Currently the app uses neither, in order to keep things simple and avoid adding unnecessary complexity
- Refactor the App component's handleClick method to make it more modular and maintainable
- Add authentication to the Shopper Application. Currently the app allows a shopper to edit her application by simply logging in with her email address alone
- DRY out client-side validation methods rather than having a separate method for each field
- Validate Date of Birth field to ensure applicant is at least 18 years of age, for example
- Create an index on applicationDate to optimize the query executed by the funnels.json endpoint
- Consider using a crosstab query in order to aggregate entirely on the database rather than also on the server