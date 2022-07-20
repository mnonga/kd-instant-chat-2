<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class ApiLoginController extends AbstractController
{
    /**
     * @Route("/api/login", name="api_login")
     */
    public function index(EntityManagerInterface $em): Response
    {
        /**
         * @var $user User
         */
        $user = $this->getUser();
        $user->setApiToken(sha1(uniqid()));
        $em->flush();

        return $this->json($user);
    }
}
