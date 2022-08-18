# Slice and Dice - simple API to derive simplified summary statistics (mean, min, max)

##Requirements

- [x] An API to add a new record to the dataset.
- [x] Should have an example of running adding a new record.
- [ ] Should have an example of failing to add a new record.
- [ ] document the case to run both insertions in the README.
- [ ] An API to delete a record from the dataset.
- [ ] Should have an example of deleting a record.
- [ ] Should have an example of failing to delete a record.
- [ ] document the case to run both deletion in the README.
- [ ] Load example dataset into the DB.
- [ ] An API to fetch summary statistics for salary over the entire dataset. You can ignore the currency (if not
      mentioned otherwise) of the salary and simply treat salary as a number.
- [ ] Should have an example of fetching the entire dataset.
- [ ] Should have an example of failing to fetch the entire dataset.
- [ ] document the case to run both fetches in the README.
- [ ] An API to fetch summary statistics for salary for records which satisfy "on_contract": "true".
- [ ] Should have an example of fetching the salary with "on_contract: true" attribute.
- [ ] Should have an example of failing to fetch the salary with "on_contract: true" attribute.
- [ ] document the case to run both fetches in the README.
- [ ] An API to fetch summary statistics for salary for each department. This means that whatever you’ll do in Step 3, should be done for each department. The return of this API should have 1 summary statistics available for each unique department.
- [ ] Should have an example of fetching the summary statistics of salary for each department.
- [ ] Should have an example of failing to fetch the summary statistics of salary for each department.
- [ ] document the case to run both fetches in the README.
- [ ] An API to fetch summary statistics for salary for each department and sub-department combination. This
      is similar to Case 5 but 1 level of nested aggregation.
- [ ] Should have an example of fetching the summary statistics of salary for each department and sub-department combination.
- [ ] Should have an example of failing to fetch the summary statistics of salary for each department and sub-department combination.
- [ ] document the case to run both fetches in the README.
- [ ] Bootstrap the project in Docker: **docker-compose.yml** in the root folder; **docker-compose up** should be able to run the service
- [ ] Implement basic authentication (any user name and password)
- [ ] Implement basic authorization (any user name and password)
- [ ] Input should be validated against their schema
- [ ] Error handling & the proper HTTP code should be added when authentication fails
- [ ] Error handling & the proper HTTP code should be added when authorization fails
