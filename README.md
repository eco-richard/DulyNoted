# DulyNoted

DulyNoted is a soft clone of the popular note taking website and application [Evernote](https://evernote.com). Users are able to create notes and attach them to created notebooks in order to organize them. 

The live site can be found [here](https://dulynoted.onrender.com)

## Technologies used

### Backend 

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

### Frontend

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Use

To use the site, enter through the live site above or host it locally.

### Hosting Locally

Using the `env.example` files in the `root` and `react-app` create `.env` files to hold the environment variables. 

Then migrate the database and seed the data by running

```
flask db migrate
flask db upgrade
flask seed all
```

Then start the backend server using the `flask run` command (the server runs on localhost:5000, so if that port is in use, the command `flask run -p PORT_NUMBER` to run on a different port)

Then change directory to `react-app` and run `npm install` to install the node packages and then `npm start` to start the development server. 

