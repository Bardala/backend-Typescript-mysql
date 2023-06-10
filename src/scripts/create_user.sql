CREATE USER 'teams_system_api'@'mysqlConn' IDENTIFIED BY '88888888';

/* In an ideal world, we should strictly provide the grants the API has access
 * to a specific table rather than all the privileges.
 */
GRANT ALL PRIVILEGES ON teams_system.teams TO 'teams_system_api'@'mysqlConn';
flush privileges;

/*
    ON teams_system.teams - This specifies the database object 
    (a table named "teams" within a database named "teams_system") 
    to which the user will be granted privileges.
*/

/**
 the first line of the script creates a user called teams_system_api and gives it
    a password of mySecretPassword.
     The second line grants the user all privileges
    on the teams_system.teams table. This means that the API can do anything it
    wants with the teams table, but nothing else. This is a good thing, as it means
    that if the API is compromised, the attacker can only do damage to the teams
    table, and not to any other tables in the database.
*/