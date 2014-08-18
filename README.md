Bugster
=======

Lightweight PHP &amp; MySQL bug tracker

Description:
============

Bugster is a lightweight bug tracker written in PHP that uses MySQL to store lists of bugs.

Features:
=========

- Very lightweight
- No user/authentication functions
- A bug can be marked as important, making it change appearance in the list

As there is no authentication function it is highly recommended to use bugster ONLY internally where those who have access can be trusted.

Installation:
============

- Upload to server
- Run setup script by accessing the setup folder in a browser
- Move config.php generated by setup script to your bugster installations root
- Delete Setup folder

Screenshot:
===========
![alt text](https://raw.githubusercontent.com/DukeW/Bugster/master/screenshot.png "Screenshot")

Coming soon:
============

List admin improovments:

- Show list meta data in list admin
- Rename existing lists
- Cleaning up database(delete info about deleted lists, delete bugs not associated with a list)*


*Will need some sort of security

License
----

MIT
