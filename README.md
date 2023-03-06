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

## Splash Page
<img width="1426" alt="Screen Shot 2023-03-06 at 9 40 59 AM" src="https://user-images.githubusercontent.com/41271140/223142713-a5e28498-0f5f-445c-b0bb-fc52f95f09ce.png">

## Login and Signup
<img width="468" alt="Screen Shot 2023-03-06 at 9 41 11 AM" src="https://user-images.githubusercontent.com/41271140/223142842-0fd660ea-a2b6-4934-9abc-ec880e7c39c7.png">
<img width="463" alt="Screen Shot 2023-03-06 at 9 41 20 AM" src="https://user-images.githubusercontent.com/41271140/223142869-6aafb757-036b-46dd-94ea-8d8f897675d8.png">

## Home Page
<img width="1423" alt="Screen Shot 2023-03-06 at 9 41 35 AM" src="https://user-images.githubusercontent.com/41271140/223142920-2798c65b-a59b-498d-8bf0-82a6a208c195.png">

## Notes
<img width="1422" alt="Screen Shot 2023-03-06 at 9 41 46 AM" src="https://user-images.githubusercontent.com/41271140/223142954-e1b0e4c5-4cfa-417a-a260-91e5a357d81c.png">

## Notebooks
<img width="1418" alt="Screen Shot 2023-03-06 at 9 41 58 AM" src="https://user-images.githubusercontent.com/41271140/223142987-f28f161c-bf2f-4f2a-8ecd-00a6e039dd56.png">

