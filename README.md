
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="client/public/assets/Eye.png" alt="Logo" width="120" height="120">
  </a>

  <h1 align="center">Procto Pulse</h1>

  <h4 align="center">
    No room for tricks, just honest clicks
    <br />
    <br />
    <br />
    <a href="https://github.com/DP-NOTHING/Procto-pulse/">View Demo</a>
    ·
    <a href="https://github.com/DP-NOTHING/Procto-pulse/issues">Report Bug</a>
    ·
    <a href="https://github.com/DP-NOTHING/Procto-pulse/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot 2024-03-28 182137 - Copy](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/4527ca7f-827d-4783-9ae1-774a43252116)

Welcome to our cutting-edge Auto Exam Proctoring platform, where academic integrity meets advanced technology to ensure a fair and secure testing environment for all participants.

How it is done:

* Registration Process:   Students are required to supply a current passport-sized photo while registering for a specific exam. During the exam, this picture is used as a reference for identity verification.

* Live Webcam Monitoring:  Our system records the user's live webcam feed while the exam is in progress. We use the most recent facial recognition models to validate the candidate's identity by comparing the uploaded passport photo with the live webcam feed. This procedure guarantees that the exam-taker is, in fact, the registered student.

* Proctoring and Monitoring:  In real time, our software keeps a close eye on the exam setting. Proctopulse has a feature that continuously checks the webcam feed to find any eviations or irregularities. It uses advanced facial detection techniques such as YOLOv5.  Proctopulse flags instances  where


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With



* React
* Node
* Express
* Mongo
* Fast-api
* Material UI
* Yolov5face
* deepface

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites
react , node and python must be installed


### Installation

2. Clone the repo
   ```sh
   https://github.com/DP-NOTHING/Procto-pulse.git
   ```
3. Install packages
   ```sh
   cd client
   npm install

   cd server
   npm install

   cd service
   pip install requirnment.txt
   ```
4. Create env files

    in Client folder
   ```js
    PORT = 
    REACT_APP_BACKEND = ''
    REACT_APP_SERVICE=''
   ```

   in server folder

   ```js
    CONNECTIONSTRING = ""
    SERVICE_URL=""
    PORT = 
    JWT_SECRET = ''
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Run the Project

1. start server using 
```sh
cd server
npm start
```

2. start Service
```sh
cd service
uvicorn main:app --reload
```

3. Start Client
```sh
cd client
npm start
```


<!-- USAGE EXAMPLES -->
## ScreenShots

![Screenshot 2024-03-28 182104](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/450cd9e4-b5c0-4885-92f4-0cc95bca277c)
![Screenshot 2024-03-28 182137](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/6fb51a5e-d05d-4c26-883e-eb0c155f877d)
![Screenshot 2024-03-28 230317](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/bbb4e361-4cd3-4756-8342-aa9881b923d7)
![Screenshot 2024-03-28 230334](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/1af06e28-1940-46de-ac41-03513980d108)

# Teacher
![Screenshot 2024-03-28 182307](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/91ac831e-9c84-4951-8f84-ea577b1ddb9d)
![Screenshot 2024-03-28 225504](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/c6557bd8-96b4-49ac-81aa-37a6261262b6)
![Screenshot 2024-03-28 230304](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/8568f0c2-10fc-4e72-ab66-890013c5dfd6)
![Screenshot 2024-03-28 230238](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/0ccca239-352c-48bc-8465-e461cfa1c014)


# Student
![Screenshot 2024-03-28 182213](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/41ccad8c-7eb3-4c1f-b40a-1b797e62e0a3)
![Screenshot 2024-03-28 225545](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/239c742b-714b-4af8-a874-a14cd11f1dfb)
![Screenshot 2024-03-28 225606](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/02bf6926-0701-44c9-bc4b-0b1177de8788)
![Screenshot 2024-03-28 225625](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/ef1a0878-3059-4ef6-89db-144463030e20)

![Screenshot 2024-03-28 225654](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/e3e31772-84d0-42d4-b22a-fa7677397441)


![Screenshot 2024-03-28 230144](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/6e1b278e-b645-4124-8914-2db04a36e51c)

![Screenshot 2024-03-28 230134](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/28a0ffdd-8d3f-45e5-830b-bb05ee3f21c7)


![Screenshot 2024-03-28 225804](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/e0557932-643b-4bac-b12e-8a35ac673327)
![Screenshot 2024-03-28 225815](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/900cecdf-74ac-4c26-a53f-8a16f9a4d1e9)

![Screenshot 2024-03-28 225909](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/d790deab-627e-482f-bdc7-6ba71a5b9fb1)

![Screenshot 2024-03-28 225948](https://github.com/DP-NOTHING/Procto-pulse/assets/107257619/08ba3172-f623-45e7-a437-532c6c015bd0)



<p align="right">(<a href="#readme-top">back to top</a>)</p>





See the [open issues](https://github.com/DP-NOTHING/Procto-pulse/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## contact

Deep patel - [@LinkedIN](https://www.linkedin.com/in/patel-deep-r/) - deep1907rp@gmail.com
Dev Mehta
Krunal Parekh

Project Link: [https://github.com/DP-NOTHING/Procto-pulse](https://github.com/DP-NOTHING/Procto-pulse)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<p align="right">(<a href="#readme-top">back to top</a>)</p>


