export interface Collection {
  id: string;
  title: string;
  href: string;
  image: string;
}

export const categoryCollections: Collection[] = [
  {
    id: "cat-accessories",
    title: "Cat Accessories",
    href: "/collections/cat-accessories",
    image: "/images/collections/cat-accessories.webp",
  },
  {
    id: "dog-accessories",
    title: "Dog Accessories",
    href: "/collections/dog-accessories",
    image: "/images/collections/dog-accessories.webp",
  },
  {
    id: "cat-toys",
    title: "Cat Toys",
    href: "/collections/cat-toys",
    image: "/images/collections/cat-food.webp",
  },
  {
    id: "dog-toys",
    title: "Dog Toys",
    href: "/collections/dog-toys",
    image: "/images/collections/dog-toys.webp",
  },
];
