/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,

  PRIMARY KEY (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `login` */

insert  into `login`(`username`,`password`, `email`) values 

('Kjartan', 'pass', 'kj@email.com');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `login_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_last_name` varchar(50) NOT NULL,
  `user_first_name` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postal_code` varchar(15) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,

  PRIMARY KEY (`user_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`login_id`) REFERENCES `login` (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`login_id`, `user_last_name`,`user_first_name`,`phone`,`address`,`city`,`state`,`postal_code`,`country`) values 

(1, 'Einarsson','Kjartan ','250-544-1751','123 Coding Road','Victoria','BC','123456','Canada');

/*Table structure for table `account` */

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE `accounts` (
  `user_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `checking` decimal(20,2) DEFAULT NULL,
  `savings` decimal(20,2) DEFAULT NULL,
  `credit` decimal(20,2) DEFAULT NULL,
  `credit_limit` decimal(10,2) DEFAULT NULL,
  `budget` decimal(20,2) DEFAULT NULL,
  `spent` decimal(20,2) DEFAULT NULL,

  PRIMARY KEY (`account_id`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `accounts` */

insert  into `accounts`(`user_id`,`checking`,`savings`, `credit`,`credit_limit`) values 

(1, '6066.78','6066.78','6066.78','50000.00');

/*Table structure for table `payments` */

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `account_id` int(11) NOT NULL,
  `check_number` varchar(50) NOT NULL,
  `payment_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,

  PRIMARY KEY (`account_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `payments` */

insert  into `payments`(`account_id`,`check_number`,`payment_date`,`amount`) values 

(1,'HQ336336','2004-10-19','6066.78');

/*Table structure for table `transactions` */

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `account_id` int(11) NOT NULL,
  `transaction_amount` decimal(10,2) NOT NULL,
  `transaction_date` date NOT NULL,
  `account_total` decimal(10,2) NOT NULL,
  `transaction_description` varchar(50) NOT NULL,

  PRIMARY KEY (`account_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `transactions` */

insert  into `transactions`(`account_id`,`transaction_amount`,`transaction_date`,`account_total`, `transaction_description`) values 

(1,'-66','2004-10-19','6066.78','Save-on-Foods');