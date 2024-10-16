# Documentation - ERD 

Data structure for the website

![ERD](ERDiagram.png)


## Intel

- **Users**: Represents the users of the platform. Users can be buyers, sellers, or agents.
- **Properties**: Represents the properties listed on the platform. Each property is linked to a user (seller/agent).
- **Inquiries**: Represents inquiries made by users (buyers) about properties.
- **Favorites**: Represents the many-to-many relationship between users and their favorited properties.

# DDL Explained

## Users
- **stores all the user information**
- `user_id`: PK. Unique for every user.
- `email`: Must be unique for each user.
- `role`: type of user (buyer, seller, agent, admin)

## Propeties
- **stores properties listed by the user**
- - `property_id`: PK for properties.
- `user_id`: FK that links to the **Users** table.






## Documentation

 - Website: [https://dbdiagram.io](https://dbdiagram.io)
  - Documentation: [dbdiagram Documentation](https://docs.dbdiagram.io)