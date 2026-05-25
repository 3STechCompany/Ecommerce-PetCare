$ErrorActionPreference = 'SilentlyContinue'
$base = "c:\Users\AlliancePC-22\Desktop\Work\Project training\Pet\paws-demo\public\images"

$downloads = @(
  # Logo
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/logo_23323409-7fab-4acb-9d7c-c228ff88c674.webp?v=1752404367&width=300"; path="$base\logo\logo.webp"},
  
  # Hero
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/11_42448536-f3b7-40c3-9804-3dcd30edc437.jpg?v=1752399613&width=3840"; path="$base\hero\hero-desktop.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/mobile-hero_8b336e3c-3b90-4548-b423-6dad8e39ea4e.jpg?v=1752498753&width=990"; path="$base\hero\hero-mobile.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/hero-cats_447788eb-89c2-40a4-bb72-9161997e3d42.jpg?v=1752416545&width=3840"; path="$base\hero\hero-cats-desktop.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/mobile-hero-1.jpg?v=1752506933&width=990"; path="$base\hero\hero-cats-mobile.jpg"},
  
  # Collections
  @{url="https://flux-paws.myshopify.com/cdn/shop/collections/product-1-c_64c7b3b7-a04f-4bf2-9782-68240f756b97.webp?v=1752596144&width=750"; path="$base\collections\cat-food.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/collections/product-1-a_1f119ba5-2c1d-441e-8c4e-badb4e2e8af1.webp?v=1752596034&width=750"; path="$base\collections\dog-food.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/collections/product-4-a_257558f3-0d4a-43d6-a605-7750c364cf74.webp?v=1752596194&width=750"; path="$base\collections\cat-accessories.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/collections/product-1-a_e44f1d11-d3f8-4ece-aa13-cc12e88aa0a7.webp?v=1752596206&width=750"; path="$base\collections\dog-accessories.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/collections/product-2-b_652cdaea-67b7-4bdd-b122-eadffaf59763.webp?v=1752652079&width=750"; path="$base\collections\dog-toys.webp"},
  
  # Products - Cat Accessories
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-a_257558f3-0d4a-43d6-a605-7750c364cf74.webp?v=1752315300&width=533"; path="$base\products\oasis-tunnel-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-b_2c2917b2-66f6-4dc3-b2ab-f5637bc4e99f.webp?v=1752315300&width=533"; path="$base\products\oasis-tunnel-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-a_b4c08eee-9aea-4ea2-af00-dbf3d82b9148.webp?v=1752315126&width=533"; path="$base\products\perfect-pair-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-b_0e4ee6b9-42a6-43c5-a6b7-bb0d3e1efb90.webp?v=1752315126&width=533"; path="$base\products\perfect-pair-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-a_72d3cf72-b6d5-465e-890c-3b29fbad0c30.webp?v=1752315022&width=533"; path="$base\products\optimal-comfort-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-b_3c63d735-f046-4731-abd4-a3ec49017c4c.webp?v=1752315021&width=533"; path="$base\products\optimal-comfort-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-a_9359c8c5-f66d-4819-975e-17b9252aae2f.webp?v=1752315080&width=533"; path="$base\products\oasis-haven-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-c_d32fbd6a-e0f1-45c2-8cb1-115797fcff43.webp?v=1752315085&width=533"; path="$base\products\oasis-haven-c.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-b_9b16282e-42ad-4ac5-820f-8e295283d1dc.webp?v=1752315085&width=940"; path="$base\products\oasis-haven-b.webp"},

  # Products - Dog Toys
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-a_9b6ea8b5-c0b7-4f6a-b67f-2b29a8ead3ec.webp?v=1752311388&width=533"; path="$base\products\paw-rope-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-b_46f0a908-1dfa-406b-9a5b-bf5a6e454f33.webp?v=1752311388&width=533"; path="$base\products\paw-rope-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-a_e43d5c92-a5f5-44d5-8bb2-7b894beb7e41.webp?v=1752311424&width=533"; path="$base\products\plush-toy-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-b_8c113ca3-3dc2-4e46-a16f-8dfec23a4e13.webp?v=1752311424&width=533"; path="$base\products\plush-toy-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-a_09c56a23-89d4-4ccf-aeb1-ee0fdc3dffb7.webp?v=1752311465&width=533"; path="$base\products\chew-bone-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-b_94fa966c-b5b5-4a18-83ff-17e921e0adb9.webp?v=1752311465&width=533"; path="$base\products\chew-bone-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-c_9b731022-04c5-4ec6-bbde-0725d64e5806.webp?v=1752311348&width=533"; path="$base\products\tug-rope-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-b_cfc05a15-0d84-4f93-9e19-91b8dc7ae2d1.webp?v=1752311348&width=533"; path="$base\products\tug-rope-b.webp"},

  # Products - Cat Food
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-a_9db409f4-2b95-432e-8d75-1926479536de.webp?v=1752313626&width=533"; path="$base\products\mellow-dream-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-b_c6e7bc25-f0fe-4f30-ad90-82db752a5d80.webp?v=1752313625&width=533"; path="$base\products\mellow-dream-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-a_42c8fb4d-7b7d-4b68-84c3-0a20fcc53c1a.webp?v=1752312930&width=533"; path="$base\products\energizing-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-b_3dc54f6a-e04a-4fa2-9437-bc9fbcf6b6ee.webp?v=1752312930&width=533"; path="$base\products\energizing-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-a_f07cd1a4-f15d-4ad3-9cd2-df56aca72068.webp?v=1752312863&width=533"; path="$base\products\complete-care-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-b_7c893db7-24ab-44b7-a5d3-7cead3da01fb.webp?v=1752312863&width=533"; path="$base\products\complete-care-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-c_64c7b3b7-a04f-4bf2-9782-68240f756b97.webp?v=1752312980&width=533"; path="$base\products\herbal-harmony-a.webp"},

  # Products - Featured Collection
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-a_38df219e-4d46-42ba-9c7f-fd9a87e3f5b5.webp?v=1752311332&width=533"; path="$base\products\zen-bed-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-b_7b7e90a7-12f0-4b20-a2ce-fece6b4f2df2.webp?v=1752311332&width=533"; path="$base\products\zen-bed-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-a_c4613b5b-e162-4f52-8f89-de298a770ecc.webp?v=1752311299&width=533"; path="$base\products\raincoat-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-b_03b01b7c-b208-4cf8-8865-677bc73b23b6.webp?v=1752311299&width=533"; path="$base\products\raincoat-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-a_fddcc309-b71f-4723-ba48-cb1599c614d2.webp?v=1752311276&width=533"; path="$base\products\plush-bed-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-2-c_8bd69515-81dc-4154-a866-aa5e6d45987c.webp?v=1752311278&width=533"; path="$base\products\plush-bed-b.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-a_87eebbd1-8cd6-4f45-aa27-deb1fdfd4693.webp?v=1752311260&width=533"; path="$base\products\harness-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-b_ebe53898-6f1f-44a6-8728-a00d3314822e.webp?v=1752311260&width=533"; path="$base\products\harness-b.webp"},

  # Featured product large
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-a_9359c8c5-f66d-4819-975e-17b9252aae2f.webp?v=1752315080&width=940"; path="$base\products\oasis-haven-large-a.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-c_d32fbd6a-e0f1-45c2-8cb1-115797fcff43.webp?v=1752315085&width=940"; path="$base\products\oasis-haven-large-c.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-b_9b16282e-42ad-4ac5-820f-8e295283d1dc.webp?v=1752315085&width=940"; path="$base\products\oasis-haven-large-b.webp"},

  # Info cards
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/cat-toys-category.jpg?v=1752402596&width=900"; path="$base\info\functional-design.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/doog-food-category.jpg?v=1752399790&width=900"; path="$base\info\stylish-seating.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/cat-accessorize-category.jpg?v=1752400654&width=900"; path="$base\info\cozy-outfit.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/doog-toys-category_660f01b5-7252-4b18-9522-264ecd6c1324.jpg?v=1752401003&width=900"; path="$base\info\adorable-comfortable.jpg"},

  # Team/Testimonials
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/team-1.jpg?v=1752425090&width=200"; path="$base\team\team-1.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/team-2.jpg?v=1752425090&width=200"; path="$base\team\team-2.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/team-3.jpg?v=1752425090&width=200"; path="$base\team\team-3.jpg"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/team-6.jpg?v=1752425072&width=200"; path="$base\team\team-6.jpg"},

  # Testimonial product images
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-a_257558f3-0d4a-43d6-a605-7750c364cf74.webp?crop=center&height=400&v=1752315300&width=400"; path="$base\products\testimonial-oasis-tunnel.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-1-a_eb8eac7a-3f8f-4a44-9c93-d3fd5b04a23b.webp?crop=center&height=400&v=1752312811&width=400"; path="$base\products\testimonial-mellow-dream.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-4-a_9db409f4-2b95-432e-8d75-1926479536de.webp?crop=center&height=400&v=1752313626&width=400"; path="$base\products\testimonial-mellow-dream-2.webp"},
  @{url="https://flux-paws.myshopify.com/cdn/shop/files/product-3-a_c4613b5b-e162-4f52-8f89-de298a770ecc.webp?crop=center&height=400&v=1752311299&width=400"; path="$base\products\testimonial-raincoat.webp"}
)

$count = 0
$total = $downloads.Count
foreach ($d in $downloads) {
  $count++
  try {
    Invoke-WebRequest -Uri $d.url -OutFile $d.path -UseBasicParsing -ErrorAction Stop
    Write-Host "[$count/$total] OK: $(Split-Path $d.path -Leaf)"
  } catch {
    Write-Host "[$count/$total] FAIL: $(Split-Path $d.path -Leaf) - $_"
  }
}
Write-Host "`nDone! Downloaded $count files."
