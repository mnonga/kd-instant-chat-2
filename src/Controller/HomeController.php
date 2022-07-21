<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\Authorization;
use Symfony\Component\Mercure\Discovery;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'LipaController',
        ]);
    }

    /**
     * @Route("/react", name="home")
     */
    public function indexReact(Request $request, Discovery $discovery, Authorization $authorization): Response
    {
        // Link: <https://hub.example.com/.well-known/mercure>; rel="mercure"
        //$discovery->addLink($request);
        //$authorization->setCookie($request, ["http://localhost:8000/api/messages/*"]);

        return $this->render('home/index_react.html.twig', []);
    }

    /**
     * @Route("/api/stats", name="api.membres.stats")
     */
    public function test(): Response
    {
        return $this->json([]);
    }
}
