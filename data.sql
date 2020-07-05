CREATE TABLE `member` (
  `member_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`)
);
insert into member
set name = 'Lan';
insert into member
set name = 'Stuart';
insert into member
set name = 'Tyler';
insert into member
set name = 'Adam';

CREATE TABLE `project` (
  `project_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`project_id`)
);
insert into project
set name = 'E-Commerce Website';
insert into project
set name = 'Websocket Updates';
insert into project
set name = 'Angular Upgrade';
insert into project
set name = 'Empty Project';

CREATE TABLE `assignment` (
  `assignment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `estimated_hours` int(11) DEFAULT NULL,
  `task_description` text,
  PRIMARY KEY (`assignment_id`),
  KEY `assignment_member_member_id_fk` (`member_id`),
  KEY `assignment_project_project_id_fk` (`project_id`),
  CONSTRAINT `assignment_member_member_id_fk` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `assignment_project_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
);
insert into assignment
set member_id        = 1,
    project_id       = 3,
    estimated_hours  = 15,
    task_description = 'Upgrade Angular';
insert into assignment
set member_id        = 1,
    project_id       = 3,
    estimated_hours  = 10,
    task_description = 'Test';
insert into assignment
set member_id        = 2,
    project_id       = 3,
    estimated_hours  = 10,
    task_description = 'Fix Broken Things';
insert into assignment
set member_id        = 2,
    project_id       = 2,
    estimated_hours  = 2,
    task_description = 'Add to Socket.IO';
insert into assignment
set member_id        = 2,
    project_id       = 2,
    estimated_hours  = 5,
    task_description = 'Enable Broadcasting';
insert into assignment
set member_id        = 2,
    project_id       = 2,
    estimated_hours  = 3,
    task_description = 'Adjust Interface';
insert into assignment
set member_id        = 3,
    project_id       = 1,
    estimated_hours  = 10,
    task_description = 'Shopping Cart';
insert into assignment
set member_id        = 4,
    project_id       = 1,
    estimated_hours  = 5,
    task_description = 'Product Pages';
insert into assignment
set member_id        = 3,
    project_id       = 1,
    estimated_hours  = 5,
    task_description = 'My Account';
