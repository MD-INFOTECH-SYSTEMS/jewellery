const products = [
    {
        id: 1,
        name: "Royal Diamond Choker Necklace",
        sku: "RJW-NK-001",
        jewelleryType: "Choker Necklace",
        category: "Necklaces",
        collection: "Royal Heritage",
        gender: "Women",
        occasion: "Wedding / Grand Festive",
        description: "Experience the epitome of royal luxury with this handcrafted Royal Diamond Choker. Set in 18K White Gold with certified VVS diamonds and emerald accents.",
        
        // 2 & 3. Metal & Gold Details
        metalDetails: {
            metalType: "Gold",
            purity: "18K (750 Hallmarked)",
            metalColour: "White Gold",
            grossWeight: "42.50 gms",
            netMetalWeight: "38.20 gms",
            makingCharges: "₹18,500",
            wastagePercent: "4.5%",
            hallmark: "Yes (BIS 750)",
            huid: "HUID-RJ849201",
            certification: "IGI & BIS Certified"
        },

        // 4. Diamond Details
        diamondDetails: {
            diamondType: "Natural Certified",
            totalWeightCT: "3.45 Carats",
            numberOfDiamonds: 124,
            diamondShape: "Round Brilliant & Pear Cut",
            diamondColour: "E - F",
            diamondClarity: "VVS1 - VVS2",
            cut: "Excellent",
            certification: "IGI Certified",
            certificateNumber: "IGI-2026-948102"
        },

        // 5. Gemstone Details
        gemstoneDetails: {
            stoneType: "Zambian Emerald Drops",
            naturalOrSynthetic: "Natural",
            stoneColour: "Royal Deep Green",
            stoneShape: "Teardrop Cabochon",
            stoneCount: 5,
            stoneWeight: "4.30 Carats",
            origin: "Zambia"
        },

        // 6. Dimensions
        dimensions: {
            length: "14.5 Inches (Adjustable Chain)",
            width: "2.4 cm",
            height: "5.8 cm (Pendant Drop)",
            thickness: "4.0 mm",
            diameter: "N/A",
            size: "Adjustable Choker Fit",
            ringSize: "N/A",
            bangleSize: "N/A",
            earringHeight: "N/A",
            earringWidth: "N/A",
            sizeAdjustable: "Yes"
        },

        // 7. Jewellery Specifics
        specifics: {
            designStyle: "Traditional Rajasthani Kundan & Diamond",
            closureType: "S-Hook with Extension Chain",
            suitableFor: "Bridal Wear, Gala Evening",
            customizationAvailable: "Yes (Metal colour & chain length customizable)",
            sizeAdjustable: "Yes"
        },

        // 8. Hallmark & Certification
        certification: {
            hallmarked: "Yes (BIS 750)",
            huid: "HUID-RJ849201",
            authority: "Bureau of Indian Standards (BIS)",
            certificateAvailable: "Yes",
            certificateNumber: "IGI-2026-948102",
            documentUrl: "IGI Certificate Included"
        },

        // 9. Pricing Breakdown
        pricing: {
            mrp: 149999,
            sellingPrice: 129999,
            discount: "13% OFF",
            metalValue: 98500,
            makingCharges: 18500,
            stoneCharges: 9200,
            otherCharges: 0,
            gst: 3799,
            finalPrice: 129999
        },

        // 10. Stock
        stockStatus: "In Stock",
        stock: 5,
        availableQuantity: 5,
        price: 129999,
        originalPrice: 149999,
        discount: "13% OFF",
        rating: 4.8,
        reviewCount: 42,
        badge: "Exclusive",
        weight: "42.50 gms",
        featured: true,
        bestseller: true,
        wedding: true,
        gifting: false,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 2,
        name: "Heritage Gold Bangles Set",
        sku: "RJW-BG-002",
        jewelleryType: "Kada / Bangles Set",
        category: "Bracelets",
        collection: "Heritage Gold",
        gender: "Women",
        occasion: "Wedding / Traditional Festive",
        description: "Intricately carved 22K hallmarked gold bangles crafted by master Rajasthani artisans, celebrating age-old royal traditions with filigree detailing.",
        
        metalDetails: {
            metalType: "Gold",
            purity: "22K (916 BIS Hallmarked)",
            metalColour: "Yellow Gold",
            grossWeight: "36.00 gms",
            netMetalWeight: "36.00 gms",
            makingCharges: "₹12,400",
            wastagePercent: "3.5%",
            hallmark: "Yes (BIS 916)",
            huid: "HUID-RJ382910",
            certification: "BIS Hallmarked"
        },

        diamondDetails: null,
        gemstoneDetails: null,

        dimensions: {
            length: "N/A",
            width: "1.2 cm per bangle",
            height: "N/A",
            thickness: "3.2 mm",
            diameter: "2.40 Inches (Inner Diameter 6.0 cm)",
            size: "2.6 Inches",
            ringSize: "N/A",
            bangleSize: "2.6 Inches (Inner Diameter 6.0 cm)",
            earringHeight: "N/A",
            earringWidth: "N/A",
            sizeAdjustable: "No (Fixed Size)"
        },

        specifics: {
            designStyle: "Filigree Carved Royal Nakshi",
            closureType: "Screw Openable Lock",
            suitableFor: "Traditional Ceremonies, Bridal Trousseau",
            customizationAvailable: "Yes (Available in sizes 2.4, 2.6, 2.8)",
            sizeAdjustable: "No"
        },

        certification: {
            hallmarked: "Yes (BIS 916)",
            huid: "HUID-RJ382910",
            authority: "Bureau of Indian Standards (BIS)",
            certificateAvailable: "Yes",
            certificateNumber: "BIS-22K-382910",
            documentUrl: "BIS Hallmark Certificate"
        },

        pricing: {
            mrp: 95000,
            sellingPrice: 85500,
            discount: "10% OFF",
            metalValue: 70600,
            makingCharges: 12400,
            stoneCharges: 0,
            otherCharges: 0,
            gst: 2500,
            finalPrice: 85500
        },

        stockStatus: "In Stock",
        stock: 8,
        availableQuantity: 8,
        price: 85500,
        originalPrice: 95000,
        discount: "10% OFF",
        rating: 4.7,
        reviewCount: 28,
        badge: "Bestseller",
        weight: "36.00 gms",
        featured: true,
        bestseller: true,
        wedding: true,
        gifting: true,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 3,
        name: "Princess Cut Engagement Ring",
        sku: "RJW-RG-003",
        jewelleryType: "Solitaire Engagement Ring",
        category: "Rings",
        collection: "Royal Solitaire",
        gender: "Women",
        occasion: "Engagement / Proposal / Anniversary",
        description: "A breathtaking 1.25 Carat princess-cut solitaire diamond held gracefully in a platinum band with an 18K yellow gold inner comfort line.",
        
        metalDetails: {
            metalType: "Platinum & Gold",
            purity: "PT950 / 18K Gold (750)",
            metalColour: "Dual Tone (White Platinum & Yellow Gold)",
            grossWeight: "6.80 gms",
            netMetalWeight: "6.55 gms",
            makingCharges: "₹14,200",
            wastagePercent: "2.0%",
            hallmark: "Yes (PT950 & BIS 750)",
            huid: "HUID-RJ592018",
            certification: "GIA & BIS Certified"
        },

        diamondDetails: {
            diamondType: "Natural Certified Solitaire",
            totalWeightCT: "1.25 Carats",
            numberOfDiamonds: 1,
            diamondShape: "Princess Cut",
            diamondColour: "E (Colorless)",
            diamondClarity: "VVS1",
            cut: "Ideal",
            certification: "GIA Certified",
            certificateNumber: "GIA-2026-582910"
        },

        gemstoneDetails: null,

        dimensions: {
            length: "N/A",
            width: "0.6 cm",
            height: "0.8 cm (Solitaire Crown)",
            thickness: "2.1 mm",
            diameter: "1.72 cm (Ring Size 14)",
            size: "Size 14 (US Size 7)",
            ringSize: "Size 14 (Custom Sizing Available)",
            bangleSize: "N/A",
            earringHeight: "N/A",
            earringWidth: "N/A",
            sizeAdjustable: "Yes (Free Resizing)"
        },

        specifics: {
            designStyle: "Modern Royal Solitaire",
            closureType: "Four-Prong Crown Setting",
            suitableFor: "Engagement, Proposal",
            customizationAvailable: "Yes (Free Engraving & Custom Sizing)",
            sizeAdjustable: "Yes"
        },

        certification: {
            hallmarked: "Yes (PT950)",
            huid: "HUID-RJ592018",
            authority: "Gemological Institute of America (GIA) & BIS",
            certificateAvailable: "Yes",
            certificateNumber: "GIA-2026-582910",
            documentUrl: "GIA Dossier Included"
        },

        pricing: {
            mrp: 275000,
            sellingPrice: 245000,
            discount: "11% OFF",
            metalValue: 48000,
            makingCharges: 14200,
            stoneCharges: 175600,
            otherCharges: 0,
            gst: 7200,
            finalPrice: 245000
        },

        stockStatus: "In Stock",
        stock: 3,
        availableQuantity: 3,
        price: 245000,
        originalPrice: 275000,
        discount: "11% OFF",
        rating: 4.9,
        reviewCount: 56,
        badge: "New",
        weight: "6.80 gms",
        featured: true,
        bestseller: false,
        wedding: true,
        gifting: true,
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 4,
        name: "Ruby Drop Heritage Earrings",
        sku: "RJW-ER-004",
        jewelleryType: "Drop Earrings",
        category: "Earrings",
        collection: "Heritage",
        gender: "Women",
        occasion: "Wedding / Festive / Party",
        description: "Royal Burmese rubies encased in delicate 22K gold filigree with brilliant uncut diamonds, designed to add regal grace to any celebratory attire.",
        
        metalDetails: {
            metalType: "Gold",
            purity: "22K (916 BIS Hallmarked)",
            metalColour: "Yellow Gold",
            grossWeight: "18.40 gms",
            netMetalWeight: "15.20 gms",
            makingCharges: "₹6,800",
            wastagePercent: "3.0%",
            hallmark: "Yes (BIS 916)",
            huid: "HUID-RJ719204",
            certification: "BIS Hallmarked"
        },

        diamondDetails: {
            diamondType: "Uncut Polki Diamonds",
            totalWeightCT: "0.80 Carats",
            numberOfDiamonds: 16,
            diamondShape: "Uncut Rose Cut",
            diamondColour: "J - K",
            diamondClarity: "SI",
            cut: "Natural Uncut",
            certification: "BIS & Gem Certified",
            certificateNumber: "GEM-2026-719204"
        },

        gemstoneDetails: {
            stoneType: "Burmese Ruby",
            naturalOrSynthetic: "Natural",
            stoneColour: "Pigeon Blood Red",
            stoneShape: "Teardrop Drop",
            stoneCount: 2,
            stoneWeight: "2.40 Carats",
            origin: "Myanmar (Burma)"
        },

        dimensions: {
            length: "N/A",
            width: "1.8 cm",
            height: "4.5 cm",
            thickness: "3.0 mm",
            diameter: "N/A",
            size: "Standard Drop Fit",
            ringSize: "N/A",
            bangleSize: "N/A",
            earringHeight: "4.5 cm",
            earringWidth: "1.8 cm",
            sizeAdjustable: "No"
        },

        specifics: {
            designStyle: "Royal Heritage Chandbali & Drop",
            closureType: "Bombay Screw Back Push Lock",
            suitableFor: "Festive Occasions, Weddings",
            customizationAvailable: "Yes (Stone replacement options)",
            sizeAdjustable: "No"
        },

        certification: {
            hallmarked: "Yes (BIS 916)",
            huid: "HUID-RJ719204",
            authority: "Bureau of Indian Standards (BIS)",
            certificateAvailable: "Yes",
            certificateNumber: "GEM-2026-719204",
            documentUrl: "Jewellery Authenticity Card"
        },

        pricing: {
            mrp: 52000,
            sellingPrice: 45900,
            discount: "12% OFF",
            metalValue: 31200,
            makingCharges: 6800,
            stoneCharges: 6560,
            otherCharges: 0,
            gst: 1340,
            finalPrice: 45900
        },

        stockStatus: "In Stock",
        stock: 6,
        availableQuantity: 6,
        price: 45900,
        originalPrice: 52000,
        discount: "12% OFF",
        rating: 4.6,
        reviewCount: 19,
        badge: null,
        weight: "18.40 gms",
        featured: false,
        bestseller: false,
        wedding: true,
        gifting: true,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 5,
        name: "Antique Bridal Kundan Choker",
        sku: "RJW-NK-005",
        jewelleryType: "Bridal Heavy Choker",
        category: "Necklaces",
        collection: "Bridal Masterpieces",
        gender: "Women",
        occasion: "Wedding / Royal Bridal Trousseau",
        description: "An heirloom bridal masterpiece featuring uncut Polki diamonds, hand-painted Meenakari enamel work, and natural freshwater pearl drops.",
        
        metalDetails: {
            metalType: "Gold",
            purity: "22K (916 BIS Hallmarked)",
            metalColour: "Antique Yellow Gold",
            grossWeight: "124.00 gms",
            netMetalWeight: "102.50 gms",
            makingCharges: "₹48,000",
            wastagePercent: "5.0%",
            hallmark: "Yes (BIS 916)",
            huid: "HUID-RJ958201",
            certification: "BIS & Gem Certified"
        },

        diamondDetails: {
            diamondType: "Uncut Syndicate Polki",
            totalWeightCT: "8.50 Carats",
            numberOfDiamonds: 86,
            diamondShape: "Natural Uncut Flat Polki",
            diamondColour: "J - K",
            diamondClarity: "Natural Uncut",
            cut: "Hand Cut Polki",
            certification: "Gemological Lab Certified",
            certificateNumber: "POLKI-2026-958201"
        },

        gemstoneDetails: {
            stoneType: "Zambian Emerald & Basra Pearls",
            naturalOrSynthetic: "Natural",
            stoneColour: "Emerald Green & Cream Ivory",
            stoneShape: "Carved Beads & Drops",
            stoneCount: 24,
            stoneWeight: "13.00 Carats",
            origin: "Zambia & Persian Gulf"
        },

        dimensions: {
            length: "16.0 Inches (Adjustable Dori)",
            width: "4.8 cm",
            height: "9.2 cm (Central Crest)",
            thickness: "5.5 mm",
            diameter: "N/A",
            size: "Adjustable Royal Choker",
            ringSize: "N/A",
            bangleSize: "N/A",
            earringHeight: "N/A",
            earringWidth: "N/A",
            sizeAdjustable: "Yes (Silk Dori Cord)"
        },

        specifics: {
            designStyle: "Jaipur Meenakari & Polki Kundan",
            closureType: "Adjustable Silk Thread Dori",
            suitableFor: "Bridal Main Day",
            customizationAvailable: "Yes (Custom Dori & Stone Tones)",
            sizeAdjustable: "Yes"
        },

        certification: {
            hallmarked: "Yes (BIS 916)",
            huid: "HUID-RJ958201",
            authority: "Bureau of Indian Standards (BIS)",
            certificateAvailable: "Yes",
            certificateNumber: "POLKI-2026-958201",
            documentUrl: "Bridal Heirloom Certificate"
        },

        pricing: {
            mrp: 600000,
            sellingPrice: 550000,
            discount: "8% OFF",
            metalValue: 420000,
            makingCharges: 48000,
            stoneCharges: 66000,
            otherCharges: 0,
            gst: 16000,
            finalPrice: 550000
        },

        stockStatus: "In Stock",
        stock: 2,
        availableQuantity: 2,
        price: 550000,
        originalPrice: 600000,
        discount: "8% OFF",
        rating: 5.0,
        reviewCount: 34,
        badge: "Bridal Special",
        weight: "124.00 gms",
        featured: true,
        bestseller: true,
        wedding: true,
        gifting: false,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 6,
        name: "Rose Gold Diamond Bracelet",
        sku: "RJW-BG-006",
        jewelleryType: "Kada / Oval Bracelet",
        category: "Bracelets",
        collection: "Everyday Luxury",
        gender: "Women",
        occasion: "Daily Wear / Party / Gifting",
        description: "Modern elegance rendered in 18K warm rose gold studded with round brilliant cut diamonds in a secure box-latch setting.",
        
        metalDetails: {
            metalType: "Gold",
            purity: "18K (750 Hallmarked)",
            metalColour: "Rose Gold",
            grossWeight: "22.10 gms",
            netMetalWeight: "21.90 gms",
            makingCharges: "₹11,500",
            wastagePercent: "2.5%",
            hallmark: "Yes (BIS 750)",
            huid: "HUID-RJ482910",
            certification: "SGL Certified"
        },

        diamondDetails: {
            diamondType: "Natural Certified",
            totalWeightCT: "0.95 Carats",
            numberOfDiamonds: 42,
            diamondShape: "Round Brilliant Cut",
            diamondColour: "G - H",
            diamondClarity: "VS1 - VS2",
            cut: "Very Good",
            certification: "SGL Certified",
            certificateNumber: "SGL-2026-482910"
        },

        gemstoneDetails: null,

        dimensions: {
            length: "N/A",
            width: "0.8 cm",
            height: "N/A",
            thickness: "2.8 mm",
            diameter: "2.20 Inches (Inner Oval Fit)",
            size: "Medium (Fits Wrist 6.5 to 7.0 Inches)",
            ringSize: "N/A",
            bangleSize: "2.4 Inches",
            earringHeight: "N/A",
            earringWidth: "N/A",
            sizeAdjustable: "No (Hinged Box Lock)"
        },

        specifics: {
            designStyle: "Contemporary Geometric Diamond Line",
            closureType: "Side Safety Lock with Double Catch",
            suitableFor: "Office Wear, Cocktail Parties",
            customizationAvailable: "Yes (Yellow Gold or Platinum Option)",
            sizeAdjustable: "No"
        },

        certification: {
            hallmarked: "Yes (BIS 750)",
            huid: "HUID-RJ482910",
            authority: "Solitaire Gemological Laboratories (SGL)",
            certificateAvailable: "Yes",
            certificateNumber: "SGL-2026-482910",
            documentUrl: "SGL Guarantee Card"
        },

        pricing: {
            mrp: 125000,
            sellingPrice: 110000,
            discount: "12% OFF",
            metalValue: 71500,
            makingCharges: 11500,
            stoneCharges: 23800,
            otherCharges: 0,
            gst: 3200,
            finalPrice: 110000
        },

        stockStatus: "In Stock",
        stock: 7,
        availableQuantity: 7,
        price: 110000,
        originalPrice: 125000,
        discount: "12% OFF",
        rating: 4.5,
        reviewCount: 15,
        badge: null,
        weight: "22.10 gms",
        featured: false,
        bestseller: false,
        wedding: false,
        gifting: true,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 7,
        name: "Kundan Meena Statement Ring",
        sku: "RJW-RG-007",
        jewelleryType: "Cocktail Statement Ring",
        category: "Rings",
        collection: "Heritage Gold",
        gender: "Women",
        occasion: "Festive / Wedding / Gifting",
        description: "Traditional Rajasthani Kundan Meena artwork featuring vibrant hand-painted reverse enamel work and a central focal gemstone.",
        
        metalDetails: {
            metalType: "Gold",
            purity: "22K (916 BIS Hallmarked)",
            metalColour: "Yellow Gold",
            grossWeight: "11.20 gms",
            netMetalWeight: "9.80 gms",
            makingCharges: "₹4,200",
            wastagePercent: "3.5%",
            hallmark: "Yes (BIS 916)",
            huid: "HUID-RJ201948",
            certification: "BIS Hallmarked"
        },

        diamondDetails: {
            diamondType: "Uncut Polki",
            totalWeightCT: "0.45 Carats",
            numberOfDiamonds: 8,
            diamondShape: "Flat Polki Cut",
            diamondColour: "J - K",
            diamondClarity: "Natural Uncut",
            cut: "Uncut",
            certification: "BIS Hallmarked",
            certificateNumber: "BIS-2026-201948"
        },

        gemstoneDetails: {
            stoneType: "Synthetic Ruby Central Cabochon",
            naturalOrSynthetic: "Synthetic / Glass Meena",
            stoneColour: "Crimson Red & Emerald Green Enamel",
            stoneShape: "Round Flower Motif",
            stoneCount: 1,
            stoneWeight: "0.95 Carats",
            origin: "Jaipur Handcrafted"
        },

        dimensions: {
            length: "N/A",
            width: "2.2 cm (Flower Motif Diameter)",
            height: "1.1 cm",
            thickness: "1.8 mm",
            diameter: "1.80 cm (Adjustable Band)",
            size: "Adjustable Ring Shank",
            ringSize: "Free Size (Fits Sizes 12 to 18)",
            bangleSize: "N/A",
            earringHeight: "N/A",
            earringWidth: "N/A",
            sizeAdjustable: "Yes"
        },

        specifics: {
            designStyle: "Jaipur Floral Meenakari",
            closureType: "Adjustable Open Shank",
            suitableFor: "Festive Dinners, Traditional Gatherings",
            customizationAvailable: "Yes (Enamel Colour Option)",
            sizeAdjustable: "Yes"
        },

        certification: {
            hallmarked: "Yes (BIS 916)",
            huid: "HUID-RJ201948",
            authority: "Bureau of Indian Standards (BIS)",
            certificateAvailable: "Yes",
            certificateNumber: "BIS-2026-201948",
            documentUrl: "BIS Stamp Verification"
        },

        pricing: {
            mrp: 38000,
            sellingPrice: 32000,
            discount: "15% OFF",
            metalValue: 24200,
            makingCharges: 4200,
            stoneCharges: 2700,
            otherCharges: 0,
            gst: 900,
            finalPrice: 32000
        },

        stockStatus: "In Stock",
        stock: 10,
        availableQuantity: 10,
        price: 32000,
        originalPrice: 38000,
        discount: "15% OFF",
        rating: 4.4,
        reviewCount: 22,
        badge: null,
        weight: "11.20 gms",
        featured: false,
        bestseller: false,
        wedding: true,
        gifting: true,
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 8,
        name: "Emerald Pearl Jhumka Set",
        sku: "RJW-ER-008",
        jewelleryType: "Jhumka Earrings",
        category: "Earrings",
        collection: "Royal Heritage",
        gender: "Women",
        occasion: "Wedding / Festive / Sangeet",
        description: "Traditional royal Jhumkas adorned with natural Zambian emerald beads and cultured South Sea pearls in 22K gold.",
        
        metalDetails: {
            metalType: "Gold",
            purity: "22K (916 BIS Hallmarked)",
            metalColour: "Yellow Gold",
            grossWeight: "28.60 gms",
            netMetalWeight: "24.00 gms",
            makingCharges: "₹9,800",
            wastagePercent: "4.0%",
            hallmark: "Yes (BIS 916)",
            huid: "HUID-RJ619284",
            certification: "BIS Hallmarked"
        },

        diamondDetails: null,

        gemstoneDetails: {
            stoneType: "Zambian Emerald & South Sea Pearls",
            naturalOrSynthetic: "Natural",
            stoneColour: "Emerald Green & Warm Pearl White",
            stoneShape: "Faceted Beads & Hanging Drops",
            stoneCount: 38,
            stoneWeight: "4.60 Carats",
            origin: "Zambia & South Pacific"
        },

        dimensions: {
            length: "N/A",
            width: "2.6 cm (Jhumka Bell Diameter)",
            height: "6.2 cm",
            thickness: "4.0 mm",
            diameter: "2.6 cm",
            size: "Standard Jhumka Fit",
            ringSize: "N/A",
            bangleSize: "N/A",
            earringHeight: "6.2 cm",
            earringWidth: "2.6 cm",
            sizeAdjustable: "No"
        },

        specifics: {
            designStyle: "Temple Jhumka with Hanging Pearl Cluster",
            closureType: "South Indian Screw Post with Extension Hook",
            suitableFor: "Weddings, Receptions",
            customizationAvailable: "Yes (Pearl drop length option)",
            sizeAdjustable: "No"
        },

        certification: {
            hallmarked: "Yes (BIS 916)",
            huid: "HUID-RJ619284",
            authority: "Bureau of Indian Standards (BIS)",
            certificateAvailable: "Yes",
            certificateNumber: "BIS-22K-619284",
            documentUrl: "Hallmark Authenticity Card"
        },

        pricing: {
            mrp: 99000,
            sellingPrice: 89000,
            discount: "10% OFF",
            metalValue: 69200,
            makingCharges: 9800,
            stoneCharges: 7400,
            otherCharges: 0,
            gst: 2600,
            finalPrice: 89000
        },

        stockStatus: "In Stock",
        stock: 4,
        availableQuantity: 4,
        price: 89000,
        originalPrice: 99000,
        discount: "10% OFF",
        rating: 4.8,
        reviewCount: 31,
        badge: "Gift Choice",
        weight: "28.60 gms",
        featured: true,
        bestseller: true,
        wedding: true,
        gifting: true,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
        ]
    }
];

window.products = products;
