# Slice and Dice - simple API to derive simplified summary statistics (mean, min, max)

##Requirements

1. [x] An API to add a new record to the dataset.
   - [ ] Document the case to run both insertions in the README.
2. [x] An API to delete a record from the dataset.

   - [ ] Document the case to run both deletion in the README.
   - [x] Load example dataset into the DB.

3. [x] An API to fetch summary statistics for salary over the entire dataset. You can ignore the currency (if not mentioned otherwise) of the salary and simply treat salary as a number.

   - [x] Fetch summary statistics for a specific currency.
   - [ ] Document the case to run both fetches in the README.

4. [x] An API to fetch summary statistics for salary for records which satisfy **on_contract: "true"**(passed in as query parameter).

   - [ ] document the case to run both fetches in the README.

5. [ ] An API to fetch summary statistics for salary for each department. This means that whatever you’ll do in Step 3, should be done for each department. The return of this API should have **1 summary statistics available for each unique department**.

   - [ ] document the case to run both fetches in the README.

6. [ ] An API to fetch **summary statistics for salary for each department and sub-department combination**. This is similar to Case 5 but 1 level of nested aggregation.

   - [ ] document the case to run both fetches in the README.

7. [ ] Bootstrap the project in Docker: **docker-compose.yml** in the root folder; **docker-compose up** should be able to run the service

8. [ ] Implement basic **authentication**(any user name and password)

   - [ ] Implement basic **authorization**(any user name and password)

9. [x] Input should be **validated against their schema**

10. [ ] **Error handling & the proper HTTP code** should be added when authentication fails
    - [ ] **Error handling & the proper HTTP code** should be added when authorization fails
