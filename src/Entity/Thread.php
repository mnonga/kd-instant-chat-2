<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ThreadRepository;
use App\Resolver\ThreadCollectionResolver;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ThreadRepository::class)
 */
#[ApiResource(
    mercure: true,
    graphql: [
    //'item_query',
    'collection_query'=>['security' => "is_granted('ROLE_ADMIN')"],
    'item_query' => ['security' => "is_granted('THREAD_READ',object)"],
    //'collection_query' => ['security' => "is_granted('ROLE_USER')"],
    //'collection_query' => ['security' => "is_granted('IS_AUTHENTICATED_FULLY')"],
    'create' => ['security' => "is_granted('ROLE_USER')"],
    'update',
    'collectionQuery' => [
        'collection_query' => ThreadCollectionResolver::class
    ]
], collectionOperations: [
    "GET" => ['security' => "is_granted('ROLE_USER')"]
],
    itemOperations: [
        'GET' => ['security' => "is_granted('THREAD_READ',object)"]
    ]
)]
class Thread
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $subject;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="thread", orphanRemoval=true, cascade={"persist"})
     */
    private $messages;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="threads")
     */
    private $participants;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setThread($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getThread() === $this) {
                $message->setThread(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(User $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
        }

        return $this;
    }

    public function removeParticipant(User $participant): self
    {
        $this->participants->removeElement($participant);

        return $this;
    }
}
