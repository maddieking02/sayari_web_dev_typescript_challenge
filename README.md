# sayari_web_dev_typescript_challenge
Tech Stack: TypeScript, React, Redux, Node/Express, PostgreSQL, Docker

## Development Process
### Architectural and API Design:
Front End: For the front end client, I decided to use a TypeScript, React, and Redux stack along with other libraries for optimized front end performance and code maintainability. Since this is a development level application, I decided to use webpack-dev-server to utilize its hot reload feature -- which made for a much smoother development process. 

Back End: For the API, I used TypeScript, Node/Express, and PostgreSQL. Based on the structure of the json data and its relational nature, I decided to go with a SQL type database for this application. The reason for choosing PostgreSQL (over MySQL) is because PostgreSQL is favored in terms of its advanced features (e.g. aggregate functions) and data integrity. Normally, I would implement clustering to optimize resource utilization, but since we're using Docker (a lightweight container), it seemed like running a cluster might actually worsen overall latency because it takes up more processes per container, and thus decided against it. 

### Data Modeling:
When modeling my data, I was mostly focused on three aspects: relations between entities, data normalization, and future performance and scalability. During the inital diagramming phase, I thought four tables (users, posts, answers, comments) would be more beneficial since we would have a clear separation of concerns, more efficient querying for a wider variety of use cases, and it would better accomodate a growing data and user base. 

One aspect I could have handled differently, is adding both a user_id AND a user_name to each of the post, answer, and comment tables. When retreiving data, I often found myself having to repetitvely nest queries to ensure that each data object had the user_name contained (to be rendered on the front end) -- maybe we can justify the original design by arguring 'storage tradeoffs' but all in all, a bit of a sunk cost fallacy here for this specific use case. 

<details>
    <summary>Schema Diagramming</summary>

![Screenshot 2023-07-13 at 8 33 10 AM](https://github.com/maddieking02/sayari_web_dev_typescript_challenge/assets/106297124/5cadf078-a507-46e3-bdf4-c70352d58583)

</details>

### Challenges
There were a couple challenges I ran into during my implementation, the first challenge being the Docker setup. Although I have previous experience working with Docker, I've never been the one to set up the actual Docker and Docker Compose files. Nevertheless, I am well aware of its benefits especially in production, so I dedicated the first two days of this assessment period to learn the proper syntax, establish networks and volumes, and to get my containers up and running. 

The second challenge I faced was trying to learn and properly use RxJS with my queries. I had originally refactored my queries to utilize Observables and other RxJS operators, however when testing with Postman I was getting a lot of unintended side effects (e.g. dupes). Given the time constraint, I reverted back to Promise syntax to resolve those issues. Note: I am eager to learn more about reactive programming moving forward. 

### Areas of Improvement for Production:
In terms of 'cutting corners' on parts that I found rote or boring, I definitely cut corners on testing. My priority for this assessment was to write clean, maintainable, and modular code for both front end and back end systems while picking up some new technologies. If this were a real life dev environment, I would have used Playwright for front end application integrity and Jest/Supertest to test API endpoints to ensure proper data handling (before bugs manifest futher in downstream models) prior to production. 

Another implementation that would be great for production is having some sort of middleware, external service, or Redis to rate limit user requests. In my specifc use case I did not find a need to implement it, however if the application were more built out (e.g. user's being able to post questions or make commentary) then it would've been more essential.

## Getting Started

Installation
- Clone the repository
    ```
        git clone https://github.com/maddieking02/sayari_web_dev_typescript_challenge.git
    ```
- Install Docker for your OS
    ```
        https://docs.docker.com/get-docker/
    ```
- Run the following script in the root file
    ```
        bash bash.sh
    ```
