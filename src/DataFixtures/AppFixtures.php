<?php

namespace App\DataFixtures;

use App\Entity\Message;
use App\Entity\Thread;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker\Factory;

class AppFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        $users = [];

        for ($i = 1; $i <= 10; $i++) {
            $u = (new User())->setEmail("user$i@gmail.com")
                ->setRoles(['ROLE_USER'])
                ->setFullName($faker->firstNameMale);
            $u->setPassword($this->passwordHasher->hashPassword(
                $u,
                "12345678"
            ));

            $users[] = $u;
            $manager->persist($u);
        }

        $threads = [];
        for ($i = 0; $i < 5; $i++) {
            $t = (new Thread())->setSubject($faker->firstNameMale)
                ->addParticipant($users[0])
                ->addParticipant($users[$i+1])
                ->addMessage((new Message())
                    ->setSender($users[0])
                    ->setContent($faker->address)
                )->addMessage((new Message())
                    ->setSender($users[$i+1])
                    ->setContent($faker->address)
                );
            $manager->persist($t);
            $threads[] = $t;
        }

        $manager->flush();
    }
}
