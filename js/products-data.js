/**
 * JapaLink - Comprehensive Japanese Proxy Catalog & System Data
 * Authentic products from Mercari, Amazon JP, Surugaya, ZenPlus, Minne, and JDirectItems
 */

const JAPALINK_DATA = {
  stores: [
    { id: 'all', name: 'All Stores', tag: 'All Japan', icon: 'fas fa-globe-asia' },
    { id: 'mercari', name: 'Mercari', tag: 'Flea Market', icon: 'fas fa-store', color: '#ff0211', desc: 'Japan’s largest flea market marketplace. Rare anime merch, vintage collectibles, and second-hand bargains from individual Japanese sellers.' },
    { id: 'jdirect', name: 'JDirectItems', tag: 'Direct Tokyo Stock', icon: 'fas fa-box-open', color: '#ff7300', desc: 'Curated Japanese lifestyle & hobby goods shipped directly from Tokyo verified partner warehouses with zero domestic shipping fee.' },
    { id: 'amazon', name: 'Amazon JP', tag: 'Official & Prime', icon: 'fab fa-amazon', color: '#ff9900', desc: 'Official Japanese books, manga sets, electronic gadgets, games, and CD/DVDs with lightning fast 24-hour warehouse arrival.' },
    { id: 'surugaya', name: 'Surugaya', tag: 'Hobby & Pre-owned', icon: 'fas fa-gamepad', color: '#0055aa', desc: 'The holy grail for pre-owned anime figures, doujinshi, retro video games, trading cards, and vintage Japanese pop culture goods.' },
    { id: 'zenplus', name: 'ZenPlus', tag: '0% Proxy Fee', icon: 'fas fa-tag', color: '#00aa66', desc: 'Direct Japanese manufacturers and brand boutiques offering exclusive merchandise with 0 yen proxy service fee.' },
    { id: 'minne', name: 'Minne', tag: 'Handmade Crafts', icon: 'fas fa-paint-brush', color: '#e66b88', desc: 'Japan’s premier artisan marketplace featuring handmade jewelry, traditional pottery, leather crafts, and bespoke stationery.' },
    { id: 'other', name: 'Other Store', tag: 'Custom URL Order', icon: 'fas fa-link', color: '#6f42c1', desc: 'Order from ANY Japanese website (Booth, Animate, Premium Bandai, Melonbooks, Toranoana) by simply pasting the item URL.' }
  ],

  categories: [
    { id: 'figures', name: 'Anime Figures', count: '14,200+ Items', image: 'assets/images/collection-figures.jpg', desc: 'Scale figures, Nendoroids, Pop Up Parade, and exclusive Japanese prize figures.' },
    { id: 'plush', name: 'Plush Toys', count: '8,400+ Items', image: 'assets/images/collection-plush.jpg', desc: 'Authentic crane game UFO catchers, Pokemon Center plushies, and anime mascot dolls.' },
    { id: 'manga', name: 'Manga & Novels', count: '29,000+ Items', image: 'assets/images/collection-manga.jpg', desc: 'Original Japanese tankobon, artbooks, light novels, and limited collector editions.' },
    { id: 'cards', name: 'Trading Cards', count: '19,500+ Items', image: 'assets/images/collection-cards.jpg', desc: 'Pokemon TCG Japanese boosters, PSA graded cards, One Piece Card Game, and Yu-Gi-Oh.' },
    { id: 'models', name: 'Model Kits', count: '6,100+ Items', image: 'assets/images/collection-models.jpg', desc: 'Bandai Gunpla (MG, RG, HG), Tamiya military & automotive models, and Kotobukiya mecha.' },
    { id: 'stationery', name: 'Stationery & Daily', count: '11,800+ Items', image: 'assets/images/collection-stationery.jpg', desc: 'Curated Japanese fountain pens, Midori MD notebooks, Tombow markers, and washi tapes.' },
    { id: 'snacks', name: 'Snacks & Treats', count: '4,300+ Items', image: 'assets/images/collection-snacks.jpg', desc: 'Authentic Uji matcha sweets, Tokyo Banana, limited seasonal KitKats, and senbei rice crackers.' },
    { id: 'retrogames', name: 'Retro Games', count: '7,900+ Items', image: 'assets/images/collection-retrogames.jpg', desc: 'Famicom, Game Boy, Super Famicom, PlayStation 1/2 Japanese imports and vintage consoles.' }
  ],

  products: [
    {
      id: 'prod-01',
      title: 'Fate/Grand Order - Saber Alter 1/7 Scale Figure (Deluxe Edition)',
      jpTitle: 'Fate/Grand Order セイバー/アルトリア・ペンドラゴン[オルタ] 1/7スケール',
      store: 'mercari',
      storeName: 'Mercari Japan',
      category: 'figures',
      categoryName: 'Anime Figures',
      priceJpy: 18500,
      priceUsd: 122.50,
      image: 'assets/images/products/figure-1.jpg',
      images: [
        'assets/images/products/figure-1.jpg',
        'assets/images/collection-figures.jpg'
      ],
      condition: 'Like New (With Box)',
      seller: 'AnimeCollector_Tokyo (4.9 ★ - 418 reviews)',
      location: 'Tokyo, Japan',
      weightGrams: 850,
      stock: 1,
      isMercari: true,
      proxyFee: 300,
      description: 'Authentic Japanese domestic release by Good Smile Company. Opened only for display inside a sealed glass cabinet, zero dust or sun fading. Comes complete with interchangeable Excalibur Morgan sword and deluxe base.',
      specifications: {
        'Brand': 'Good Smile Company',
        'Height': 'Approx. 250mm',
        'Material': 'PVC & ABS painted complete figure',
        'Release Year': '2023',
        'Item Condition': 'Rank A (Box opened, figure like new)'
      }
    },
    {
      id: 'prod-02',
      title: 'Hatsune Miku Symphony 2023 Special 1/8 Scale Memorial Figure',
      jpTitle: '初音ミクシンフォニー 2023 5th Anniversary Special Figure',
      store: 'surugaya',
      storeName: 'Surugaya',
      category: 'figures',
      categoryName: 'Anime Figures',
      priceJpy: 14200,
      priceUsd: 94.00,
      image: 'assets/images/products/figure-2.jpg',
      images: [
        'assets/images/products/figure-2.jpg',
        'assets/images/collection-figures.jpg'
      ],
      condition: 'Brand New (Factory Sealed)',
      seller: 'Surugaya Shinjuku Hobby Shop',
      location: 'Shinjuku, Tokyo',
      weightGrams: 920,
      stock: 3,
      isMercari: false,
      proxyFee: 300,
      description: 'Official commemorative concert scale figure featuring Hatsune Miku playing violin in an elegant ballroom dress with translucent crystal ribbons.',
      specifications: {
        'Manufacturer': 'Max Factory',
        'Scale': '1/8 Scale',
        'Sculptor': 'Hiroshi (Sakurazensen)',
        'Item Condition': 'Rank S (Brand New Unopened)'
      }
    },
    {
      id: 'prod-03',
      title: 'Neon Genesis Evangelion - Asuka Langley Shikinami Radio Eva Vol.2',
      jpTitle: 'RADIO EVA エヴァンゲリオン 式波・アスカ・ラングレー Ver.RADIO EVA Part.2',
      store: 'amazon',
      storeName: 'Amazon Japan',
      category: 'figures',
      categoryName: 'Anime Figures',
      priceJpy: 16800,
      priceUsd: 111.25,
      image: 'assets/images/products/figure-3.jpg',
      images: [
        'assets/images/products/figure-3.jpg'
      ],
      condition: 'Brand New (In Stock)',
      seller: 'Amazon.co.jp Official Fulfillment',
      location: 'Chiba Logistics Hub',
      weightGrams: 780,
      stock: 5,
      isMercari: false,
      proxyFee: 300,
      description: 'Official collaboration figure between Radio EVA and Hobby Max. Urban streetwear styling with immaculate jacket stitching details and vibrant red sneaker accents.',
      specifications: {
        'Publisher': 'Hobby Max Japan',
        'Packaging': 'Original Window Display Box',
        'Origin': 'Japan Official Domestic Version'
      }
    },
    {
      id: 'prod-04',
      title: 'Uma Musume Pretty Derby - Special Week Big Nesoberi Plush',
      jpTitle: 'ウマ娘 プリティーダービー スペシャルウィーク 特大寝そべりぬいぐるみ',
      store: 'mercari',
      storeName: 'Mercari Japan',
      category: 'plush',
      categoryName: 'Plush Toys',
      priceJpy: 4200,
      priceUsd: 27.80,
      image: 'assets/images/collection-plush.jpg',
      images: [
        'assets/images/collection-plush.jpg',
        'assets/images/products/plush-1.jpg'
      ],
      condition: 'Brand New with Tag',
      seller: 'UFO_Hunter_Nagoya (5.0 ★ - 1,120 reviews)',
      location: 'Aichi, Japan',
      weightGrams: 450,
      stock: 1,
      isMercari: true,
      proxyFee: 300,
      description: 'Authentic Sega Prize UFO arcade catcher win in Japan. Kept in plastic protective sleeve right after retrieval. Features signature purple ribbon, horse ears, and embroidered eyes.',
      specifications: {
        'Brand': 'Sega Plaza Game Prize',
        'Size': 'Length approx. 40cm',
        'Fabric': 'Premium soft polyester velboa',
        'Tags': 'Original paper tag intact'
      }
    },
    {
      id: 'prod-05',
      title: 'Pokemon Center Japan - Sleeping Eevee Fluffy Hugging Cushion Plush',
      jpTitle: 'ポケモンセンターオリジナル すやすやイーブイ ぬいぐるみクッション',
      store: 'jdirect',
      storeName: 'JDirectItems',
      category: 'plush',
      categoryName: 'Plush Toys',
      priceJpy: 5600,
      priceUsd: 37.10,
      image: 'assets/images/products/plush-2.jpg',
      images: [
        'assets/images/products/plush-2.jpg',
        'assets/images/collection-plush.jpg'
      ],
      condition: 'Brand New Direct Tokyo Stock',
      seller: 'JapaLink Tokyo Warehouse Verified',
      location: 'Tokyo Warehouse, Japan',
      weightGrams: 620,
      stock: 8,
      isMercari: false,
      proxyFee: 300,
      description: 'Directly sourced from the official Pokemon Center Mega Tokyo in Ikebukuro. Ultra soft memory marshmallow foam interior designed for desk rest and cuddling.',
      specifications: {
        'Brand': 'The Pokemon Company Japan',
        'Dimensions': '32 x 28 x 20 cm',
        'Safety': 'Japanese ST Safety Certified'
      }
    },
    {
      id: 'prod-06',
      title: 'Billy Bat Vol. 1-20 Complete Manga Set by Naoki Urasawa',
      jpTitle: 'BILLY BAT ビリーバット 全20巻完結セット 浦沢直樹 講談社',
      store: 'surugaya',
      storeName: 'Surugaya',
      category: 'manga',
      categoryName: 'Manga & Novels',
      priceJpy: 7800,
      priceUsd: 51.65,
      image: 'assets/images/collection-manga.jpg',
      images: [
        'assets/images/collection-manga.jpg',
        'assets/images/products/manga-1.jpg'
      ],
      condition: 'Very Good (Clean set, no tears)',
      seller: 'Surugaya Books Department',
      location: 'Shizuoka, Japan',
      weightGrams: 3400,
      stock: 2,
      isMercari: false,
      proxyFee: 300,
      description: 'Complete 20-volume Japanese mystery thriller masterpiece by Naoki Urasawa (creator of Monster and 20th Century Boys). All volumes inspected with clean spines and minimal shelf wear.',
      specifications: {
        'Author': 'Naoki Urasawa / Takashi Nagasaki',
        'Publisher': 'Kodansha Morning KC',
        'Language': 'Japanese (Original Furigana text)',
        'Volumes': '1 through 20 (Complete story arc)'
      }
    },
    {
      id: 'prod-07',
      title: 'Chainsaw Man Part 1 Limited Memorial Box (Vol. 1-11 + Shonen Jump Artbook)',
      jpTitle: 'チェンソーマン 第1部完結特製コミックボックス + イラスト画集',
      store: 'amazon',
      storeName: 'Amazon Japan',
      category: 'manga',
      categoryName: 'Manga & Novels',
      priceJpy: 6200,
      priceUsd: 41.00,
      image: 'assets/images/products/manga-2.jpg',
      images: [
        'assets/images/products/manga-2.jpg'
      ],
      condition: 'Brand New (Factory Shrink-wrapped)',
      seller: 'Amazon JP Media',
      location: 'Tokyo Logistics Center',
      weightGrams: 2100,
      stock: 4,
      isMercari: false,
      proxyFee: 300,
      description: 'Official commemorative collector box set containing volumes 1 through 11 in original Japanese print, alongside bonus character stickers and mini art cards.',
      specifications: {
        'Author': 'Tatsuki Fujimoto',
        'Publisher': 'Shueisha Jump Comics',
        'Bonus': '11 Metallic art postcards'
      }
    },
    {
      id: 'prod-08',
      title: 'Pokemon TCG 151 Japanese Booster Box (SV2a) - Factory Sealed with Shrink',
      jpTitle: 'ポケモンカードゲーム スカーレット&バイオレット 強化拡張パック「ポケモンカード151」BOX',
      store: 'mercari',
      storeName: 'Mercari Japan',
      category: 'cards',
      categoryName: 'Trading Cards',
      priceJpy: 11800,
      priceUsd: 78.15,
      image: 'assets/images/collection-cards.jpg',
      images: [
        'assets/images/collection-cards.jpg',
        'assets/images/products/card-2.jpg'
      ],
      condition: 'Brand New Factory Sealed (Shrink intact)',
      seller: 'PokeMaster_Omiya (5.0 ★ - 892 reviews)',
      location: 'Saitama, Japan',
      weightGrams: 310,
      stock: 2,
      isMercari: true,
      proxyFee: 300,
      description: 'Original Japanese Pokemon 151 Booster Box containing 20 packs (7 cards per pack). Guaranteed original Japanese shrink wrap with safety barcode sticker. High chance of Master Ball reverse holos and SAR Charizard/Erika.',
      specifications: {
        'Edition': 'Scarlet & Violet SV2a Japanese',
        'Shrink Status': '100% Sealed Original Plastic',
        'Pack Count': '20 Booster Packs'
      }
    },
    {
      id: 'prod-09',
      title: 'One Piece Card Game - Awakening of the New Era (OP-05) Booster Box',
      jpTitle: 'ONE PIECE カードゲーム 新時代の主役【OP-05】ブースターパック 1BOX',
      store: 'surugaya',
      storeName: 'Surugaya',
      category: 'cards',
      categoryName: 'Trading Cards',
      priceJpy: 9200,
      priceUsd: 60.90,
      image: 'assets/images/products/card-2.jpg',
      images: [
        'assets/images/products/card-2.jpg',
        'assets/images/collection-cards.jpg'
      ],
      condition: 'Brand New Sealed',
      seller: 'Surugaya Card Center Akihabara',
      location: 'Akihabara, Tokyo',
      weightGrams: 340,
      stock: 5,
      isMercari: false,
      proxyFee: 300,
      description: 'Features the iconic Gear 5 Sun God Nika Luffy Manga Rare card. 24 packs per box, directly purchased from Bandai Carddass Japanese distribution.',
      specifications: {
        'Brand': 'Bandai Namco',
        'Series': 'One Piece Card Game Japan',
        'Contents': '24 Packs / Box'
      }
    },
    {
      id: 'prod-10',
      title: 'Bandai MG 1/100 RX-78-2 Gundam Ver. 3.0 Gunpla Model Kit',
      jpTitle: 'MG 1/100 RX-78-2 ガンダム Ver.3.0 バンダイスピリッツ プラモデル',
      store: 'amazon',
      storeName: 'Amazon Japan',
      category: 'models',
      categoryName: 'Model Kits',
      priceJpy: 4950,
      priceUsd: 32.75,
      image: 'assets/images/collection-models.jpg',
      images: [
        'assets/images/collection-models.jpg',
        'assets/images/products/gunpla-1.jpg'
      ],
      condition: 'Brand New (Unassembled runners sealed)',
      seller: 'Amazon Japan Official Spirts Store',
      location: 'Tokyo Warehouse',
      weightGrams: 890,
      stock: 6,
      isMercari: false,
      proxyFee: 300,
      description: 'The pinnacle of Master Grade 1/100 Gunpla engineering! Featuring multi-tone armor plating matching the life-sized Odaiba Gundam statue, sliding knee and elbow joints, and copper foil sticker sheet.',
      specifications: {
        'Grade': 'Master Grade (MG) 1/100',
        'Manufacturer': 'Bandai Spirits Hobby',
        'Runner Bags': 'All 18 runner bags factory heat-sealed',
        'Includes': 'Core Fighter, Beam Rifle, Shield, Hyper Bazooka'
      }
    },
    {
      id: 'prod-11',
      title: 'Real Grade RG 1/144 Sazabi MSN-04 Char Aznable Counterattack Kit',
      jpTitle: 'RG 1/144 サザビー 機動戦士ガンダム 逆襲のシャア バンダイ',
      store: 'jdirect',
      storeName: 'JDirectItems',
      category: 'models',
      categoryName: 'Model Kits',
      priceJpy: 5200,
      priceUsd: 34.40,
      image: 'assets/images/products/gunpla-2.jpg',
      images: [
        'assets/images/products/gunpla-2.jpg'
      ],
      condition: 'Brand New Direct Tokyo Stock',
      seller: 'JapaLink Tokyo Hobby Warehouse',
      location: 'Tokyo, Japan',
      weightGrams: 980,
      stock: 3,
      isMercari: false,
      proxyFee: 300,
      description: 'Widely praised as one of the greatest RG kits ever made. Immense shelf presence with articulated funnels, opening hatch gimmicks, and realistic decals.',
      specifications: {
        'Grade': 'Real Grade (RG) 1/144',
        'Manufacturer': 'Bandai Spirits Japan',
        'Part Count': 'Over 400 precision molded parts'
      }
    },
    {
      id: 'prod-12',
      title: 'Pilot Custom 74 Fountain Pen - 14K Gold Nib (Black & Gold Trim)',
      jpTitle: 'パイロット 万年筆 カスタム74 ブラック 14K F (細字)',
      store: 'zenplus',
      storeName: 'ZenPlus',
      category: 'stationery',
      categoryName: 'Stationery & Daily',
      priceJpy: 14800,
      priceUsd: 98.00,
      image: 'assets/images/products/stationery-1.jpg',
      images: [
        'assets/images/products/stationery-1.jpg',
        'assets/images/collection-stationery.jpg'
      ],
      condition: 'Brand New (Factory Boxed with Con-70N Converter)',
      seller: 'Tokyo Kyobashi Pen Boutique (Official ZenPlus)',
      location: 'Chuo-ku, Tokyo',
      weightGrams: 180,
      stock: 5,
      isMercari: false,
      proxyFee: 0, // Zenplus 0 fee promo!
      description: 'Iconic classic Japanese fountain pen with hand-tuned 14-karat solid gold nib. Delivers silky smooth line variation and legendary Pilot reliability for journaling and sketching.',
      specifications: {
        'Nib': '14K Gold #5 Size (Fine / Medium)',
        'Filling Mechanism': 'Cartridge or CON-70N high capacity converter',
        'Origin': 'Made in Hiratsuka, Japan'
      }
    },
    {
      id: 'prod-13',
      title: 'Midori MD Notebook Journal Set (A5 Blank + Goat Leather Cover)',
      jpTitle: 'ミドリ MDノート A5 無罫 + ゴートレザー ノートカバーセット',
      store: 'jdirect',
      storeName: 'JDirectItems',
      category: 'stationery',
      categoryName: 'Stationery & Daily',
      priceJpy: 7900,
      priceUsd: 52.30,
      image: 'assets/images/collection-stationery.jpg',
      images: [
        'assets/images/collection-stationery.jpg'
      ],
      condition: 'Brand New',
      seller: 'JapaLink Stationery Curated Collection',
      location: 'Tokyo Warehouse, Japan',
      weightGrams: 350,
      stock: 10,
      isMercari: false,
      proxyFee: 300,
      description: 'The epitome of Japanese minimalist stationery. Midori MD paper is bleed-resistant and fountain pen friendly, encased in a supple vegetable-tanned goat leather cover that patinas with age.',
      specifications: {
        'Paper': '176 pages MD Paper Cream',
        'Binding': 'Thread-stitched lie-flat binding',
        'Size': 'A5 (210 x 148 mm)'
      }
    },
    {
      id: 'prod-14',
      title: 'Traditional Kyoto Kyo-Yaki Handcrafted Ceramic Matcha Chawan Bowl',
      jpTitle: '京都 京焼・清水焼 抹茶茶碗 結晶釉 金彩 手作り陶器',
      store: 'minne',
      storeName: 'Minne',
      category: 'crafts',
      categoryName: 'Artisan Crafts',
      priceJpy: 8500,
      priceUsd: 56.25,
      image: 'assets/images/products/craft-1.jpg',
      images: [
        'assets/images/products/craft-1.jpg',
        'assets/images/products/craft-2.jpg'
      ],
      condition: 'Brand New Artisan Handmade',
      seller: 'Kiyomizu_Atelier_Kyoto (4.98 ★ - 340 sales)',
      location: 'Higashiyama, Kyoto',
      weightGrams: 420,
      stock: 2,
      isMercari: false,
      proxyFee: 300,
      description: 'One-of-a-kind handmade tea ceremony bowl crafted in Kyoto using traditional wood-fired kilns. Finished with crystalline crackle glaze that shimmers in natural light.',
      specifications: {
        'Craftsman': 'Master Potter Kenzo Ogawa',
        'Material': 'Kyoto local clay with natural wood ash glaze',
        'Packaging': 'Signed Paulownia wooden box (Kiribako)'
      }
    },
    {
      id: 'prod-15',
      title: 'Uji Matcha Ceremonial Grade 100g Tin from Marukyu Koyamaen',
      jpTitle: '丸久小山園 宇治抹茶 青嵐 (あおあらし) 100g缶詰 京都府産',
      store: 'amazon',
      storeName: 'Amazon Japan',
      category: 'snacks',
      categoryName: 'Snacks & Treats',
      priceJpy: 3100,
      priceUsd: 20.50,
      image: 'assets/images/collection-snacks.jpg',
      images: [
        'assets/images/collection-snacks.jpg',
        'assets/images/products/snack-1.jpg'
      ],
      condition: 'Fresh Stock (Best Before: 8 Months)',
      seller: 'Marukyu Koyamaen Official Store JP',
      location: 'Kyoto / Tokyo Distribution',
      weightGrams: 220,
      stock: 15,
      isMercari: false,
      proxyFee: 300,
      description: 'Directly sourced from the historic 300-year-old tea estate in Uji, Kyoto. Vibrant emerald green color, delicate umami aroma, and zero bitterness.',
      specifications: {
        'Origin': 'Uji, Kyoto Prefecture, Japan',
        'Grade': 'Aoarashi Ceremonial Grade',
        'Weight': '100g airtight steel canister'
      }
    },
    {
      id: 'prod-16',
      title: 'Nintendo Game Boy Advance SP - Pearl Blue (Japan Import AGS-001)',
      jpTitle: '任天堂 ゲームボーイアドバンスSP パールブルー 本体 箱説付き 動作品',
      store: 'mercari',
      storeName: 'Mercari Japan',
      category: 'retrogames',
      categoryName: 'Retro Games',
      priceJpy: 12500,
      priceUsd: 82.75,
      image: 'assets/images/collection-retrogames.jpg',
      images: [
        'assets/images/collection-retrogames.jpg'
      ],
      condition: 'Tested Working (Rank B+ with Original Box)',
      seller: 'RetroVault_Akiba (4.9 ★ - 540 sales)',
      location: 'Akihabara, Tokyo',
      weightGrams: 420,
      stock: 1,
      isMercari: true,
      proxyFee: 300,
      description: 'Original Japanese domestic release Game Boy Advance SP in Pearl Blue. Screen is clear with backlight working perfectly. Button response tested, includes original Japanese power charger and box.',
      specifications: {
        'Model': 'AGS-001 Japan Region Free',
        'Included': 'Console, Japanese 100V AC Adapter, Inner Cardboard Tray, Manual',
        'Battery': 'Original rechargeable lithium battery tested hold charge'
      }
    }
  ],

  reviews: [
    {
      id: 'rev-01',
      author: 'User B.',
      country: 'United States',
      date: 'October 14, 2024',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      text: 'Ordered a rare vintage Evangelion scale figure and two manga artbooks from Mercari Japan. JapaLink’s warehouse team packaged everything with multiple layers of industrial bubble wrap and reinforced corner protectors. Arrived in California in just 4 days via DHL! The 1st and 2nd payment breakdown was crystal clear with zero surprise fees.'
    },
    {
      id: 'rev-02',
      author: 'David L.',
      country: 'Canada',
      date: 'October 8, 2024',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      text: 'The 30-day free Tokyo warehouse storage is a game-changer! I bought 5 separate orders across Mercari, Amazon Japan, and Surugaya over three weeks, and consolidated them into one parcel. Saved over $65 on international shipping. Photos taken during inspection gave me total peace of mind.'
    },
    {
      id: 'rev-03',
      author: 'Elena R.',
      country: 'Germany',
      date: 'September 29, 2024',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      text: 'I was hesitant to buy Japanese stationery and fountain pens online, but JapaLink made it completely effortless. Their Tokyo agents placed the order with the Japanese seller within 30 minutes of my 1st payment. Customer service is responsive and polite in English. 10/10 service!'
    },
    {
      id: 'rev-04',
      author: 'Kenji T.',
      country: 'Australia',
      date: 'September 15, 2024',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      text: 'Got a factory-sealed Pokemon 151 Booster Box from a top-rated Mercari seller. JapaLink verified the shrink wrap integrity with 5 crisp inspection photos before international dispatch. Delivered safely via EMS to Sydney. Best Japanese proxy service I have ever used.'
    }
  ],

  howItWorksSteps: [
    {
      step: '01',
      title: 'Search',
      text: 'Find the desired item on the shopping platform and add it to your cart',
      detail: 'Browse Mercari, Amazon JP, Surugaya, or paste any custom Japanese URL from Booth, Animate, or Premium Bandai.'
    },
    {
      step: '02',
      title: 'Shopping',
      text: 'Pay the 1st payment (product and service fee), and we will buy the item for you.',
      detail: 'Our Tokyo procurement staff will immediately purchase the item from the Japanese merchant on your behalf.'
    },
    {
      step: '03',
      title: 'Warehouse',
      text: 'The item arrives at the warehouse and can enjoy 30 days of free storage.',
      detail: 'Combine items from different stores into one box (consolidation) and request high-resolution inspection photos.'
    },
    {
      step: '04',
      title: 'Payment',
      text: 'Pay the 2nd payment (international shipping fee), and we will ship your package.',
      detail: 'Select your preferred carrier (DHL Express, FedEx, EMS, or Surface mail) and apply your shipping discount vouchers.'
    },
    {
      step: '05',
      title: 'Delivery',
      text: 'The package is delivered to your door. This typically takes 1 to 2 weeks.',
      detail: 'Track your shipment door-to-door with comprehensive live tracking and full buyer protection insurance.'
    }
  ],

  faqList: [
    {
      cat: 'Proxy Buying & Orders',
      q: 'How does JapaLink proxy shopping work?',
      a: 'Many domestic Japanese online stores (such as Mercari Japan, Booth, Surugaya) do not ship internationally or require Japanese phone numbers and domestic payment cards. JapaLink acts as your personal shopping agent in Tokyo: we purchase the item for you, receive it at our Tokyo warehouse, store it safely, and ship it directly to your address worldwide.'
    },
    {
      cat: 'Proxy Buying & Orders',
      q: 'Can I purchase items from any Japanese website not listed in the menu?',
      a: 'Yes! Use our "Other Store" Custom URL Order feature. Simply copy the link of any product from any Japanese website (e.g. Bandai Namco, Melonbooks, Toranoana, Yahoo Auctions), enter the title and price in JPY, and add it to your cart. Our agents will process it manually.'
    },
    {
      cat: 'Payments & Fees',
      q: 'Why are there two payments (1st Payment & 2nd Payment)?',
      a: 'This is the standard, fairest method used by top Japanese proxies: The 1st Payment covers the actual item cost plus our low proxy service fee (¥300 / item). The 2nd Payment covers international shipping, which can only be accurately calculated after your goods arrive at our Tokyo warehouse, are measured, weighed, and consolidated according to your carrier preference.'
    },
    {
      cat: 'Warehouse & Shipping',
      q: 'How long can I store items in your Tokyo warehouse for free?',
      a: 'All packages enjoy 30 days of 100% FREE warehouse storage from the day of arrival! This gives you plenty of time to order from multiple different stores, wait for all packages to arrive, and consolidate them into a single parcel to save up to 70% on international shipping.'
    },
    {
      cat: 'Warehouse & Shipping',
      q: 'What international shipping carriers do you offer?',
      a: 'We offer DHL Express (2-4 business days), FedEx International Priority (3-5 business days), Japan Post EMS (4-7 business days), Airmail Small Packet (7-14 business days), and Surface Seamail (30-60 business days for heavy parcels).'
    },
    {
      cat: 'Mercari Japan',
      q: 'How does buying from Mercari Japan work?',
      a: 'Mercari is a consumer-to-consumer flea market in Japan. Our system allows you to buy instant-buy items immediately. If a listing requires a seller greeting comment, our native Japanese team handles the polite communication on your behalf.'
    }
  ],

  shippingRates: {
    // Base rates per zone (zone 1: Asia, zone 2: US/CA/AU, zone 3: Europe, zone 4: Rest of World)
    zones: {
      'US': { name: 'United States', zone: 2, dhlBase: 3200, fedexBase: 3100, emsBase: 2900, surfaceBase: 1800 },
      'ID': { name: 'Indonesia', zone: 1, dhlBase: 2400, fedexBase: 2300, emsBase: 2100, surfaceBase: 1400 },
      'CA': { name: 'Canada', zone: 2, dhlBase: 3300, fedexBase: 3200, emsBase: 3000, surfaceBase: 1900 },
      'AU': { name: 'Australia', zone: 2, dhlBase: 3100, fedexBase: 3000, emsBase: 2800, surfaceBase: 1800 },
      'GB': { name: 'United Kingdom', zone: 3, dhlBase: 3400, fedexBase: 3300, emsBase: 3100, surfaceBase: 2000 },
      'DE': { name: 'Germany', zone: 3, dhlBase: 3400, fedexBase: 3300, emsBase: 3100, surfaceBase: 2000 },
      'FR': { name: 'France', zone: 3, dhlBase: 3400, fedexBase: 3300, emsBase: 3100, surfaceBase: 2000 },
      'SG': { name: 'Singapore', zone: 1, dhlBase: 2200, fedexBase: 2100, emsBase: 1900, surfaceBase: 1300 },
      'MY': { name: 'Malaysia', zone: 1, dhlBase: 2200, fedexBase: 2100, emsBase: 1900, surfaceBase: 1300 },
      'PH': { name: 'Philippines', zone: 1, dhlBase: 2300, fedexBase: 2200, emsBase: 2000, surfaceBase: 1400 }
    }
  }
};

window.JAPALINK_DATA = JAPALINK_DATA;
