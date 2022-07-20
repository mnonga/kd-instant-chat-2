
symfony console doctrine:migrations:migrate

symfony console doctrine:fixtures:load

symfony console assets:install

http://localhost:8000/api/graphql

````
{
  threads{
    subject
    participants {
      _id
      id
      fullName
    }
    messages{
      id
      content
      createdAt
      sender{
        _id
        id
        fullName
      }
      metadata{
        readAt
        user{
          id
          fullName
        }
      }
    }
  }
}
````

````
{
  thread(id: "/api/threads/1"){
    id
    subject
  }
}
````

subscriptions, custom_query, security

do not send X-AUTH-TOKEN header to the login endpoint

TODO:
Connaître le nombre de messages non lus.

utilisateur B ne peux pas envoyer des messages en
se faisant passer pour un autre. Il ne pourra pas non plus lire, via l’api, des messages qui ne lui sont
pas adressés.