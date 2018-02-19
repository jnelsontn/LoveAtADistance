Distant Lovers
==========================
[Github Source Code](https://github.com/jnelsontn/DistantLovers)

Contact:  [jordan@digitalmarshmellow.com](mailto:jordan@digitalmarshmellow.com)

----------
**ABOUT:**
Distant Lovers is an application created for the couple in a long distance relationship. Unique one-to-one relationships are created for each couple and their data is privately stored so all messages, photos, events, and contacts are shown only to the couple.

Distant Lovers uses an AngularJs client and the server is built using the Django REST framework.

**USAGE:**

A user must register (with their email) to use the website and they are then presented with a "Search" screen where they must enter the email of their partner (who must have signed up). If the partner comes up in a search, the user can click the "Send Request" link to send a notification to the partner for a relationship. Once sent, the partner must accept and the two users are now in a relationship.

After connecting, upon login, each user is presented a joint dashboard where they can share photos, messages, events, contacts and more.

**SCREENSHOTS**

A few "in action" screenshots of Distant Love.
![Dashboard View](https://raw.githubusercontent.com/jnelsontn/DistantLovers/master/screenshots/dashboard.png)

[Dashboard View Cont](https://raw.githubusercontent.com/jnelsontn/DistantLovers/master/screenshots/dashboard2.png)

[Edit Profile](https://raw.githubusercontent.com/jnelsontn/DistantLovers/master/screenshots/edit-profile%20view.png)

[Photo Gallery](https://raw.githubusercontent.com/jnelsontn/DistantLovers/master/screenshots/photo_gallery.png)

**GETTING STARTED/INSTALLATION:**

First, you must have Git, Python (w/Pip) installed on your machine.

Clone down the Distant Love repository:
```git clone github.com/jnelsontn/DistantLovers.git .```

And then 
```cd server``` 
```pip install -r requirements.txt``` (to install the dependencies - Django, DjangoRestFramework)  
Once installed, please modify the ```secret.py``` file in the ```server/love_api/api``` directory and insert a random key. After doing so, you may run
 ```python manage.py makemigrations```
 ```python manage.py migrate```
to create the database. Initiate the server by running:
 ```python manage.py runserver```. 

For the AngularJs client, no set-up is necessary. Simply go to the ```client``` directory and run the server of your choice. If you started the Django server on another machine, you will need to modify the ```client/app/setup/app_server_api.js``` file and change the IP address to that of the machine running the Django API.

**TECHNOLOGIES:**

The front-end client was built using the AngularJs framework with Bootstrap for the styling. 

I used the Django Rest Framework to build the RESTful API. Token authentication is used to secure sessions and no information is presented publically, the API restricts the client to viewing information pertaining only about themselves and their user.
