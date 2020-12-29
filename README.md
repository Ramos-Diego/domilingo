# [Domilingo](https://domilingo.com/)

A dictionary of Dominican slang.

This project was used to practice CRUD operations with the MongoDB node driver and developing with Next.js. I plan to add some final touches and archive the project.

The idea of creating a dictionary came from a `json` file containing many slang definitions that I found.

## Todo

### GENERAL

- [x] Login using OAuth/JWT
- [x] Add TailwindCSS
- [x] Establish database connection
- [x] Index page shows words sorted alphabetically
- [x] Add a word to the database
- [x] Persist custom user data in database (id/roles)
- [x] Generate slugs for word paths (/d/[slug])
- [x] Implement SWR
- [x] Search by word
- [x] Limit example sentence length to use in Tweet button
- [x] Prevent duplicate entries
- [x] Add tags
- [x] Add edit word feature
- [x] Sort words randomly
- [x] Implement pagination or Infinite scroll
- [x] General Modal component
- [x] Search with alphabet
- [ ] Validation, sanitizing and escaping of all inputs
- [ ] Implement rate limiting
- [ ] Translate site to Spanish
- [ ] Allow users to create a username
- [ ] Trending page
- [ ] Implement word of the day
- [ ] Search by word tags
- [ ] Implement React.lazy()

### USERS

- [x] Add a word and a definition
- [x] Add example sentences
- [x] Provide feedback upon word sumission
- [x] Explain to user that words must be approved
- [ ] Limit daily submissions
- [ ] Suggest an edit on any word or definition

### ADMINS

- [x] Edit and delete user submissions
- [x] Create APPROVE function for user submissions
- [x] Automatically approve admin submissions
- [x] Ask for confirmation to delete word
- [ ] Bulk submissions
