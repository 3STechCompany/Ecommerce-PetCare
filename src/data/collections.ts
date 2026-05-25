export interface Collection {
  id: string;
  title: string;
  href: string;
  image: string;
}

export const categoryCollections: Collection[] = [
  {
    id: "cat-food",
    title: "Cat Food",
    href: "/collections/cats-food",
    image: "/images/collections/cat-food.webp",
  },
  {
    id: "dog-food",
    title: "Dog Food",
    href: "/collections/dog-food",
    image: "/images/collections/dog-food.webp",
  },
  {
    id: "cat-accessories",
    title: "Cat Accessories",
    href: "/collections/cats-accessorize",
    image: "/images/collections/cat-accessories.webp",
  },
  {
    id: "dog-accessories",
    title: "Dog Accessories",
    href: "/collections/dog-accessorize",
    image: "/images/collections/dog-accessories.webp",
  },
  {
    id: "dog-toys",
    title: "Dog Toys",
    href: "/collections/dog-toys",
    image: "/images/collections/dog-toys.webp",
  },
];
