import getDiagnosis from "../openaiHandler.js";

const predefined = [
  {
    diseaseName: "psoriasis",
    keyPoints: "Key Points about Psoriasis:\n\n1. Psoriasis is a chronic autoimmune skin condition that affects the life cycle of skin cells.\n2. The exact cause of psoriasis is unknown, but it is believed to be a combination of genetic and environmental factors.\n3. Common symptoms of psoriasis include red patches of skin covered with silvery scales, itching, dryness, and sometimes pain or burning.\n4. Psoriasis can affect any part of the body, but it most commonly appears on the scalp, elbows, knees, and lower back.\n5. While there is no cure for psoriasis, various treatment options are available to manage symptoms and control flare-ups.\n\nSymptoms of Psoriasis:\n\n1. Red patches of skin: These patches are typically raised, inflamed, and covered with thick, silvery scales.\n2. Itching and dryness: Psoriasis can cause intense itching and dryness, leading to discomfort and irritation.\n3. Pain or burning: In some cases, psoriasis can cause pain or a burning sensation in the affected areas.\n4. Nail changes: Psoriasis can also affect the nails, causing pitting, discoloration, and separation from the nail bed.\n5. Joint stiffness: Psoriatic arthritis, a type of arthritis that often accompanies psoriasis, can cause joint stiffness, swelling, and pain.\n\nRisk Factors for Psoriasis:\n\n1. Family history: Having a close relative with psoriasis significantly increases the risk of developing the condition.\n2. Stress: Emotional stress and certain life events may trigger or worsen psoriasis symptoms.\n3. Infections: Certain infections, particularly streptococcal infections, can lead to the development or exacerbation of psoriasis.\n4. Smoking and alcohol consumption: Both smoking and excessive alcohol consumption have been linked to an increased risk of developing psoriasis.\n5. Obesity: Being overweight or obese can increase the risk of psoriasis and make symptoms more severe.",
    commonSymptoms: "Psoriasis is a chronic autoimmune condition that affects the skin, causing red, scaly patches to develop. While there is no cure for psoriasis, there are several treatment options available to help manage the symptoms and improve the quality of life for individuals with this condition. The choice of treatment depends on the severity of the disease, the location of the patches, and the patient's preferences. Here are some of the available treatment options:\n\n1. Topical medications: These are applied directly to the affected skin and are often the first-line treatment for mild to moderate psoriasis. Examples include corticosteroids, vitamin D analogs, retinoids, salicylic acid, and coal tar preparations. They help reduce inflammation, control scaling, and relieve itching.\n\n2. Phototherapy: This treatment involves exposing the skin to ultraviolet (UV) light under medical supervision. Phototherapy can be done with natural sunlight or artificial UV lamps. Narrowband UVB and psoralen plus ultraviolet A (PUVA) are two common types of phototherapy used for psoriasis. They help slow down the rapid skin cell growth and reduce inflammation.\n\n3. Systemic medications: These medications are prescribed for moderate to severe psoriasis or when other treatments have failed. They work from inside the body to target the immune system and reduce inflammation. Examples include methotrexate, cyclosporine, acitretin, and newer biologic drugs like TNF-alpha inhibitors, interleukin inhibitors, and PDE4 inhibitors. These medications may have potential side effects and require close monitoring.\n\n4. Oral retinoids: Retinoids, such as acitretin, are derived from vitamin A and can be used for severe psoriasis. They reduce skin cell growth and inflammation. However, they are not recommended during pregnancy due to the risk of birth defects.\n\n5. Injectable biologics: Biologic drugs are a newer class of medications that target specific parts of the immune system involved in psoriasis. They are administered by injection or intravenous infusion and may provide significant improvement in symptoms for individuals with moderate to severe psoriasis. Examples include adalimumab, etanercept, ustekinumab, secukinumab, and ixekizumab.\n\nIt is important to note that the choice of treatment may vary for each individual based on factors such as age, overall health, potential side effects, and treatment goals. It is recommended to consult with a dermatologist who can evaluate your specific condition and guide you in choosing the most appropriate treatment plan.",
  },
  {
    diseaseName: "lichen",
    keyPoints: "Lichen is a chronic inflammatory skin condition that can present with various symptoms and risk factors. Here are five key points about lichen:\n\n1. Types: Lichen is a term used to describe several different skin conditions, including lichen planus, lichen sclerosus, and lichen simplex chronicus. Each type has distinct characteristics and may affect different areas of the body.\n\n2. Symptoms: Lichen can cause a range of symptoms, depending on the type. Common symptoms include itchy or painful skin lesions, redness, scaling, thickening of the skin, and the appearance of a lacy or web-like pattern on the affected area. In some cases, lichen may also lead to hair loss or nail changes.\n\n3. Risk factors: While the exact cause of lichen is unknown, certain risk factors may contribute to its development. These include autoimmune disorders, such as lupus or hepatitis C infection, allergic reactions, stress, certain medications (like beta-blockers or nonsteroidal anti-inflammatory drugs), and genetic predisposition. Lichen sclerosus is more common in postmenopausal women.\n\n4. Triggers: Lichen can be triggered or exacerbated by certain factors. These may include stress, friction or rubbing of the affected area, exposure to certain chemicals or allergens, hormonal changes, and infections. Identifying and avoiding triggers can help in managing the condition.\n\n5. Diagnosis and treatment: Diagnosing lichen usually involves a physical examination of the affected area and may require a skin biopsy for confirmation. Treatment options for lichen vary depending on the type and severity but may include topical corticosteroids, immunomodulators, antihistamines, or oral medications. In some cases, lifestyle modifications and self-care measures, such as gentle skin care and avoiding irritants, can also help alleviate symptoms.\n\nIt's important to consult a dermatologist for an accurate diagnosis and personalized treatment plan if you suspect you may have lichen or any other skin condition.",
    commonSymptoms: "Lichen, also known as lichen planus, is a chronic inflammatory condition that affects the skin, mucous membranes, nails, and hair follicles. While there is no cure for lichen planus, several treatment options are available to manage its symptoms and reduce discomfort. The choice of treatment depends on the severity and location of the lesions, as well as the individual's overall health.\n\n1. Topical corticosteroids: These are commonly used as the first-line treatment for lichen planus. They help reduce inflammation, itching, and discomfort. Mild to moderate strength corticosteroid creams or ointments are applied directly to the affected areas. In some cases, occlusive dressings may be used to enhance the effectiveness of the medication.\n\n2. Topical calcineurin inhibitors: These medications, such as tacrolimus and pimecrolimus, are alternative options for treating lichen planus, especially in sensitive areas like the face, genitals, and oral cavity. They work by suppressing the immune response and reducing inflammation.\n\n3. Oral corticosteroids: In severe or widespread cases of lichen planus, oral corticosteroids may be prescribed. These medications are more potent and can have systemic side effects, so their use is usually limited to short-term treatment.\n\n4. Retinoids: Retinoids, such as isotretinoin, can be used in resistant cases of lichen planus. They help normalize skin cell growth, reduce inflammation, and suppress the immune system. These medications require close monitoring due to potential side effects.\n\n5. Immunosuppressants: In severe cases that do not respond to other treatments, immune-suppressing medications like methotrexate, cyclosporine, or mycophenolate mofetil may be prescribed. These drugs work by suppressing the immune system to reduce inflammation.\n\n6. Phototherapy: Ultraviolet (UV) light therapy, either with UVA or UVB radiation, can be beneficial for some patients with lichen planus. This treatment helps reduce inflammation and control itching. It may be combined with psoralen, a light-sensitizing medication, to enhance its effectiveness (PUVA therapy).\n\n7. Topical anesthetics: For oral lichen planus that causes pain or discomfort, topical anesthetics like lidocaine or benzocaine can provide temporary relief. These products are available as gels or mouth rinses.\n\nIt's important to note that lichen planus is a chronic condition, and the goal of treatment is to manage symptoms and control flare-ups. Regular follow-up with a dermatologist is essential to monitor the condition and adjust the treatment plan as necessary.",
  },
  {
    diseaseName: "vitiligo",
    keyPoints: "Key points about vitiligo:\n\n1. Vitiligo is a chronic skin condition characterized by the loss of pigment, resulting in white patches or spots on the skin.\n\n2. The exact cause of vitiligo is unknown, but it is believed to be an autoimmune disorder in which the body's immune system mistakenly attacks and destroys the melanocytes (pigment-producing cells) in the skin.\n\n3. Vitiligo can occur at any age, but it often starts in early adulthood. It affects all races and both sexes equally.\n\n4. The most common symptom of vitiligo is the appearance of white patches on the skin, which can be localized or widespread. These patches are more noticeable in individuals with darker skin tones.\n\n5. Vitiligo does not cause physical discomfort or pain, but it can have a significant impact on an individual's self-esteem and quality of life, leading to psychological distress.\n\nSymptoms of vitiligo:\n\n1. Development of white patches or spots on the skin, most commonly on the face, hands, feet, elbows, knees, and genital areas.\n2. Patches may be small and localized initially, but they can gradually expand and merge to form larger areas of depigmentation.\n3. Hair in the affected areas may also lose color, resulting in white or gray hair.\n4. Some individuals may experience itching or dryness in the affected areas.\n5. Sunburns may be more likely in areas with reduced pigmentation due to the lack of melanin's protective effect.\n\nRisk factors for vitiligo:\n\n1. Family history: Having a family member with vitiligo increases the risk of developing the condition. Genetic factors are believed to play a role in its development.\n2. Autoimmune diseases: Individuals with other autoimmune diseases, such as thyroid disorders, type 1 diabetes, or alopecia areata, have a higher risk of developing vitiligo.\n3. Skin trauma: In some cases, vitiligo may develop at sites of skin injury, such as cuts, burns, or abrasions.\n4. Psychological stress: Emotional stress or trauma may trigger or worsen vitiligo in some individuals.\n5. Certain infections: Some viral infections, such as herpes simplex or human papillomavirus (HPV), have been associated with the development or progression of vitiligo in some cases. However, more research is needed to establish a definitive link.",
    commonSymptoms: "Vitiligo is a skin condition characterized by the loss of pigment, resulting in white patches on the skin. While there is no cure for vitiligo, there are several treatment options available to help manage the condition and improve the appearance of the affected areas. The choice of treatment depends on the extent and location of the patches, as well as the patient's preferences and medical history. Here are some commonly used treatment options:\n\n1. Topical corticosteroids: These are anti-inflammatory creams or ointments that can help to repigment the skin by reducing inflammation and suppressing the immune response. These are most effective when used on small, localized patches.\n\n2. Topical calcineurin inhibitors: Similarly to corticosteroids, these creams (such as tacrolimus or pimecrolimus) help to reduce inflammation and regulate the immune response. They are often used on sensitive areas of the skin, such as the face and genitals.\n\n3. Topical psoralen plus ultraviolet A (PUVA) therapy: In this treatment, a medication called psoralen is applied topically to the affected areas, followed by exposure to UVA light. This combination stimulates repigmentation of the skin. PUVA therapy is typically done in a medical setting.\n\n4. Narrowband ultraviolet B (NB-UVB) therapy: This involves exposing the affected skin to a specific wavelength of ultraviolet B light. NB-UVB therapy can be performed in a medical setting or at home using a handheld device. It is often recommended for widespread vitiligo.\n\n5. Excimer laser: This laser emits a high-intensity beam of UVB light to target specific areas of vitiligo. It is most effective for localized patches and can be combined with topical treatments for better results.\n\n6. Depigmentation: This option is considered for individuals with extensive vitiligo, where the remaining pigmented areas are removed to achieve a more uniform appearance. This treatment is irreversible and usually reserved for cases where other treatments have been unsuccessful.\n\nIt's important to note that the effectiveness of these treatments varies from person to person, and it may take several months to see noticeable results. Additionally, regular follow-ups with a dermatologist are crucial to monitor the progress and manage any potential side effects. A dermatologist will evaluate each patient's specific condition and recommend the most suitable treatment plan.",
  },
  {
    diseaseName: "acne",
    keyPoints: "Key points about acne:\n\n1. Acne is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells.\n2. It typically appears as pimples, blackheads, whiteheads, or cysts on the face, chest, back, and shoulders.\n3. Acne is most common during puberty when hormone production increases, but it can affect people of all ages.\n4. Treatment options for acne include topical creams or gels containing ingredients like benzoyl peroxide or salicylic acid, oral medications such as antibiotics or hormonal therapy, and certain procedures like chemical peels or laser therapy.\n5. Proper skincare practices, including gentle cleansing, avoiding excessive scrubbing or picking at the skin, and using non-comedogenic (non-pore-clogging) products, can help manage and prevent acne.\n\nSymptoms of acne:\n\n1. Pimples: Raised, red, and inflamed bumps on the skin that may be filled with pus.\n2. Blackheads: Small, dark-colored bumps that appear when hair follicles are clogged with oil and dead skin cells. They are not necessarily caused by dirt.\n3. Whiteheads: Similar to blackheads, but the follicle is completely blocked, causing a white or flesh-colored bump on the skin's surface.\n4. Cysts: Painful, fluid-filled lumps that form deep within the skin. They can be larger than typical pimples and are more likely to cause scarring.\n5. Inflammation: Acne can cause redness, swelling, and tenderness in the affected areas.\n\nRisk factors for acne:\n\n1. Hormonal changes: Increased hormone production during puberty, menstrual cycles, or hormonal imbalances can contribute to acne development.\n2. Genetics: If your parents or siblings had acne, you may be more prone to developing it as well.\n3. Certain medications: Some drugs, such as corticosteroids, androgenic steroids, or medications containing lithium or iodides, can trigger or worsen acne.\n4. Environmental factors: Exposure to certain pollutants, humidity, and sweating can exacerbate acne.\n5. Skincare and cosmetic products: Using oily or greasy products, as well as certain cosmetics that clog pores, can contribute to acne formation.",
    commonSymptoms: "As a dermatologist, I can offer several treatment options for acne. The choice of treatment depends on the severity of the acne, its type, and the patient's individual circumstances. Here are some commonly used treatments:\n\n1. Topical medications: These are applied directly to the skin and can be over-the-counter or prescription-based. They include retinoids, benzoyl peroxide, salicylic acid, and antibiotics. These medications work by reducing oil production, unclogging pores, and killing bacteria.\n\n2. Oral medications: In more severe cases of acne, oral medications may be prescribed. Antibiotics such as tetracycline or doxycycline can help control inflammation and kill bacteria. Oral contraceptives can be prescribed for females to regulate hormonal imbalances that contribute to acne. Isotretinoin, a powerful medication derived from vitamin A, is reserved for severe, resistant acne due to its potential side effects.\n\n3. Combination therapy: Dermatologists often recommend combining different treatment modalities to achieve the best results. This may involve using topical and oral medications simultaneously to target different aspects of acne development.\n\n4. Chemical peels: Chemical peels involve applying a chemical solution to the skin, which exfoliates the outer layer, unclogs pores, and reduces acne. Peels can also help diminish acne scars and improve overall skin texture.\n\n5. Light therapy: Also known as phototherapy, this treatment involves using different types of light, such as blue or red light, to kill bacteria and reduce inflammation associated with acne.\n\n6. Extraction: Dermatologists can perform manual extraction of blackheads and whiteheads using specialized tools. This should only be done by professionals to avoid scarring and infection.\n\n7. Lifestyle modifications: Certain lifestyle changes can help manage acne. These include maintaining a regular skincare routine, avoiding excessive touching or picking at the skin, using non-comedogenic makeup and skincare products, and managing stress levels.\n\nIt's important for individuals with acne to consult with a dermatologist to determine the most suitable treatment plan based on their specific needs and to monitor progress throughout the treatment process.",
  },
  {
    diseaseName: "rosacea",
    keyPoints: "Key Points about Rosacea:\n\n1. Rosacea is a chronic skin condition that primarily affects the face, causing redness, flushing, and the appearance of small blood vessels.\n2. It is a common condition, affecting an estimated 5-10% of the population, typically adults between the ages of 30 and 50.\n3. The exact cause of rosacea is unknown, but it is believed to involve a combination of genetic and environmental factors.\n4. Common triggers for rosacea flare-ups include sun exposure, hot or cold weather, spicy foods, alcohol, stress, and certain skincare products.\n5. While there is no cure for rosacea, it can be effectively managed with a combination of lifestyle modifications, topical medications, and in some cases, oral antibiotics.\n\nSymptoms of Rosacea:\n\n1. Facial redness: Persistent flushing or redness on the central part of the face, such as the cheeks, nose, forehead, and chin.\n2. Visible blood vessels: Small, visible blood vessels (telangiectasia) may appear on the face, particularly on the cheeks and nose.\n3. Papules and pustules: Inflammatory bumps resembling acne may develop, often with a tendency for these lesions to come and go.\n4. Eye problems: In some cases, rosacea can affect the eyes, causing symptoms like dryness, burning, itching, and redness (ocular rosacea).\n5. Thickened skin: In advanced cases, the skin on the nose may become thickened and bulbous, a condition known as rhinophyma.\n\nRisk Factors for Rosacea:\n\n1. Fair skin: Individuals with fair or light skin are at a higher risk of developing rosacea.\n2. Family history: Having a family history of rosacea increases the likelihood of developing the condition.\n3. Gender: Rosacea is more commonly seen in women, but when it occurs in men, it tends to be more severe.\n4. Age: Although rosacea can occur at any age, it typically develops between the ages of 30 and 50.\n5. Certain triggers: Exposure to triggers like sunlight, extreme temperatures, spicy foods, alcohol, and stress can exacerbate rosacea symptoms.",
    commonSymptoms: "Rosacea is a chronic skin condition that primarily affects the face, causing redness, visible blood vessels, and sometimes pimples. While there is no cure for rosacea, several treatment options are available to manage and control the symptoms. The choice of treatment depends on the severity and specific symptoms experienced by the patient. Here are some commonly used treatment options for rosacea:\n\n1. Topical medications: These are applied directly to the skin and are the first line of treatment for mild to moderate rosacea. Topical options include metronidazole, azelaic acid, brimonidine, and ivermectin. They help reduce redness, inflammation, and control the development of pustules or papules.\n\n2. Oral medications: For more severe cases, oral antibiotics may be prescribed to reduce inflammation and control acne-like breakouts. Tetracycline, doxycycline, and minocycline are commonly used oral antibiotics for rosacea. Isotretinoin may be prescribed for severe cases that do not respond to other treatments.\n\n3. Laser and light therapies: These procedures target the visible blood vessels and redness associated with rosacea. Intense pulsed light (IPL) therapy, pulsed dye laser (PDL), and laser resurfacing can help reduce redness and improve the appearance of blood vessels.\n\n4. Lifestyle modifications: Certain lifestyle changes can help manage rosacea symptoms. Avoiding triggers such as hot beverages, spicy foods, alcohol, and extreme temperatures can reduce flushing. Gentle skincare routines using mild, fragrance-free products and sun protection are essential to minimize irritation.\n\n5. Eye care: In some cases, rosacea can affect the eyes, causing dryness, redness, and irritation. Artificial tears, eyelid hygiene, and medications may be recommended to manage ocular symptoms.\n\nIt's important to note that treatment plans should be individualized based on the patient's specific symptoms and response to different therapies. Consulting with a dermatologist is crucial for accurate diagnosis and appropriate treatment recommendations for rosacea.",
  },
  {
    diseaseName: "tinea",
    keyPoints: "Key Points about Tinea:\n\n1. Tinea, also known as ringworm, is a fungal infection that affects the skin, hair, or nails. It is caused by various species of fungi called dermatophytes.\n2. The most common types of tinea include tinea corporis (ringworm of the body), tinea pedis (athlete's foot), tinea cruris (jock itch), tinea capitis (ringworm of the scalp), and tinea unguium (nail fungus).\n3. Tinea infections are highly contagious and can be spread through direct contact with an infected person or an object contaminated with the fungus.\n4. Symptoms of tinea may vary depending on the affected area but commonly include red, itchy, and scaly patches on the skin, hair loss or brittle nails in case of scalp or nail involvement, and sometimes a ring-shaped rash with raised edges.\n5. Risk factors for developing tinea include living in warm and humid climates, participating in activities that involve close skin contact (such as sports), compromised immune system, sharing personal items like towels or clothing with an infected individual, and having a history of tinea infections.\n\nIt is important to note that these key points provide a general overview of tinea, and it is always best to consult a dermatologist for a proper diagnosis and treatment plan tailored to your specific condition.",
    commonSymptoms: "Tinea, also known as ringworm, is a common fungal infection that affects the skin, nails, and hair. As a dermatologist, I can offer several treatment options for tinea, depending on the location and severity of the infection. Here are the available treatment options:\n\n1. Topical antifungal medications: These are the first-line treatment for most cases of tinea. They come in the form of creams, lotions, powders, or sprays. Examples include clotrimazole, terbinafine, miconazole, and ketoconazole. Apply the medication directly to the affected area and the surrounding skin for the prescribed duration, usually for 2 to 4 weeks.\n\n2. Oral antifungal medications: If the tinea infection is severe, widespread, or doesn't respond to topical treatment, oral antifungal medications may be recommended. Commonly prescribed oral antifungals include terbinafine, fluconazole, and itraconazole. These medications are taken for a specific duration, typically ranging from 2 to 6 weeks, depending on the severity of the infection.\n\n3. Antifungal shampoos: When tinea affects the scalp or causes dandruff-like symptoms, medicated shampoos containing antifungal agents such as ketoconazole or selenium sulfide can be used. These shampoos are usually used in combination with topical or oral antifungal medications for effective treatment.\n\n4. Anti-itch creams: Tinea infections can cause itching and discomfort. To relieve these symptoms, over-the-counter anti-itch creams containing ingredients like hydrocortisone can be used. However, it's important to note that these creams should not be used as the primary treatment for tinea, as they do not cure the underlying fungal infection.\n\n5. Good hygiene practices: Along with medication, maintaining good hygiene practices is crucial in managing tinea. This includes keeping the affected area clean and dry, avoiding sharing personal items like towels or clothing, and washing hands thoroughly after touching the infected area to prevent spreading the infection to other parts of the body or to others.\n\nIt's important to consult with a dermatologist for an accurate diagnosis and appropriate treatment plan for tinea. They can assess the severity of the infection and recommend the most suitable treatment option for your specific case.",
  },
  {
    diseaseName: "fungal",
    keyPoints: "5 key points about fungal infections:\n\n1. Fungal infections, also known as mycoses, are caused by various types of fungi that can invade different parts of the body, including the skin, nails, hair, and mucous membranes.\n\n2. Fungal infections are common and can affect people of all ages, but individuals with weakened immune systems or certain medical conditions, such as diabetes, are more susceptible to developing them.\n\n3. Symptoms of fungal infections vary depending on the location of the infection. Common symptoms include redness, itching, scaling, rash, blisters, and in some cases, pain or discomfort.\n\n4. Risk factors for fungal infections include excessive sweating, poor personal hygiene, wearing tight or non-breathable footwear, living in warm and humid environments, using communal showers or swimming pools, and having a compromised immune system.\n\n5. Fungal infections can be treated with antifungal medications, either applied topically or taken orally. It is important to complete the full course of treatment to ensure complete eradication of the infection and prevent recurrence.\n\nSymptoms of fungal infections:\n\n1. Skin infections: Redness, itching, scaling, rash, blisters, and sometimes pain or discomfort.\n\n2. Nail infections: Thickened, discolored, or brittle nails, nail distortion, separation of the nail from the nail bed, and sometimes pain or tenderness.\n\n3. Scalp infections: Itchy, scaly patches on the scalp, hair loss, and sometimes tender or swollen lymph nodes.\n\n4. Vaginal infections: Itching, burning, redness, swelling, abnormal vaginal discharge, and pain or discomfort during intercourse or urination.\n\n5. Oral infections (such as oral thrush): Creamy white lesions on the tongue, inner cheeks, or roof of the mouth, redness or soreness, difficulty swallowing, and altered taste sensation.\n\nRisk factors for fungal infections:\n\n1. Weakened immune system due to conditions like HIV/AIDS, cancer, or organ transplantation.\n\n2. Diabetes, especially if blood sugar levels are not well controlled.\n\n3. Excessive sweating, as it creates a moist environment that promotes fungal growth.\n\n4. Poor personal hygiene, including infrequent bathing or not drying the skin properly after bathing.\n\n5. Wearing tight or non-breathable footwear, as it creates a warm and moist environment that favors fungal growth.",
    commonSymptoms: "As a dermatologist, I can provide you with information about the available treatment options for fungal infections. Fungal infections, also known as mycoses, can affect the skin, nails, and hair. The most common types of fungal infections include athlete's foot, ringworm, jock itch, and nail fungus.\n\nTreatment options for fungal infections depend on the location and severity of the infection. Here are some commonly used treatment options:\n\n1. Topical antifungal medications: These medications are applied directly to the affected area. They come in the form of creams, lotions, gels, or powders. Topical antifungals are typically used for mild to moderate infections, such as athlete's foot or ringworm. Examples of commonly used topical antifungals include clotrimazole, terbinafine, miconazole, and ketoconazole.\n\n2. Oral antifungal medications: For more severe or widespread infections, oral antifungal medications may be prescribed. These medications are taken by mouth and typically treat systemic fungal infections or severe nail fungus. Commonly prescribed oral antifungals include terbinafine, fluconazole, itraconazole, and griseofulvin. It is important to note that oral antifungals may have potential side effects and interactions with other medications, so they should be taken under medical supervision.\n\n3. Antifungal nail lacquer: Nail fungus, also known as onychomycosis, can be treated with antifungal nail lacquer. This medication is applied directly to the infected nail surface and helps penetrate the nail to eliminate the fungus. Ciclopirox and amorolfine are commonly used antifungal nail lacquers.\n\n4. Combination therapy: In some cases, a combination of topical and oral antifungal medications may be prescribed to effectively treat the fungal infection. This approach is commonly used for severe or persistent infections.\n\n5. Other treatment options: In addition to medication, there are other treatment options available for certain fungal infections. For example, laser therapy or photodynamic therapy (PDT) may be used to treat nail fungus. These treatments aim to destroy the fungus using targeted laser or light energy.\n\nIt is important to note that proper hygiene practices, such as keeping the affected area clean and dry, wearing clean socks and shoes, and avoiding sharing personal items, can help prevent the spread and recurrence of fungal infections.\n\nIf you suspect you have a fungal infection, it is best to consult with a dermatologist for an accurate diagnosis and appropriate treatment plan tailored to your specific condition.",
  },
  {
    diseaseName: "eczema",
    keyPoints: "Key Points:\n1. Eczema, also known as atopic dermatitis, is a chronic skin condition that causes inflammation and itching.\n2. It is a non-contagious condition that tends to run in families and is often associated with other allergic conditions such as asthma and hay fever.\n3. Eczema can occur at any age, but it is most commonly seen in infants and young children. Many children outgrow eczema by adulthood, but some may continue to have symptoms throughout their lives.\n4. The exact cause of eczema is unknown, but it is believed to be a combination of genetic and environmental factors. Triggers such as certain foods, allergens, dry skin, stress, and irritants can worsen the symptoms.\n5. Treatment for eczema focuses on managing symptoms and preventing flare-ups. It may involve the use of moisturizers, topical corticosteroids, antihistamines, and avoiding triggers.\n\nSymptoms:\n1. Intense itching, especially at night.\n2. Dry, red, and inflamed skin, often with patches or raised bumps.\n3. Thickened, scaly skin in areas of chronic eczema.\n4. Cracked, weeping, or oozing skin due to severe inflammation or infection.\n5. Skin discoloration, often lighter or darker than the surrounding skin.\n\nRisk Factors:\n1. Family history of eczema or other allergic conditions.\n2. Personal history of allergies, asthma, or hay fever.\n3. Living in urban areas with higher pollution levels.\n4. Exposure to certain irritants or allergens, such as harsh soaps, detergents, fragrances, pet dander, or pollen.\n5. Having a compromised immune system or experiencing high levels of stress.",
    commonSymptoms: "As a dermatologist, I can provide you with information about the available treatment options for eczema. The goal of treatment is to manage symptoms, reduce inflammation, and prevent flare-ups. The specific treatment approach may vary depending on the severity of your eczema and individual factors. Here are some common treatment options:\n\n1. Moisturizers: Regularly applying a moisturizer can help hydrate the skin and reduce dryness, itchiness, and scaling. Choose a fragrance-free and hypoallergenic moisturizer specifically designed for sensitive skin.\n\n2. Topical corticosteroids: These are anti-inflammatory creams or ointments that can effectively relieve itching and inflammation. They are available in various strengths and should be used according to your dermatologist's instructions.\n\n3. Topical calcineurin inhibitors: These medications, such as tacrolimus and pimecrolimus, are non-steroidal creams or ointments that help reduce inflammation and itchiness. They are particularly useful for sensitive areas like the face and groin.\n\n4. Antihistamines: If itching is severe, your dermatologist may recommend oral antihistamines to help relieve the itch and improve sleep quality. These medications can cause drowsiness, so it's important to take them at night or as directed.\n\n5. Wet dressings: In cases of severe eczema, wet dressings may be used to soothe and hydrate the skin. This involves applying a moisturizer or medication and covering it with a wet bandage or wrap. It can help cool the skin, reduce inflammation, and prevent scratching.\n\n6. Phototherapy: For moderate to severe eczema, light therapy (phototherapy) may be recommended. This involves exposing the skin to controlled amounts of ultraviolet light, which can help reduce inflammation and itching.\n\n7. Systemic medications: In more severe cases where other treatments haven't been effective, your dermatologist may prescribe oral or injectable medications, such as corticosteroids, immunosuppressants, or biologics. These medications carry potential risks and side effects, so they are typically used for short periods under close medical supervision.\n\nIt's important to note that eczema is a chronic condition, and while treatment can effectively manage symptoms, there is no cure. Your dermatologist will work with you to develop a personalized treatment plan based on your specific needs and medical history. Regular follow-up appointments are crucial to track progress and make any necessary adjustments to your treatment.",
  },
];

async function searchDisease(req, res) {
  try {
    // Get the disease name from the query parameters
    const disease = req.query.disease;
    console.log(disease);

    for (const p of predefined) {
      if (disease.toLowerCase().includes(p.diseaseName.toLowerCase())) {
        const response = {
          "Key Points": p.keyPoints,
          "Common Symptoms": p.commonSymptoms,
        };

        return res.status(200).json(response);
      }
    }

    // List of prompts for disease information search
    const prompts = [
      `Provide 5 key points , symtons and risk factors about ${disease}.`,
      `Explain the available treatment options for ${disease}.`,
    ];

    // Array to store the responses
    const responses = [];

    // Call the getDiagnosis function for each prompt
    for (const prompt of prompts) {
      const diseaseInfo = await getDiagnosis(prompt);
      responses.push(diseaseInfo);
      console.log(diseaseInfo);
    }

    // Response object with the collected disease information
    const response = {
      "Key Points": responses[0],
      "Common Symptoms": responses[1],
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
}

export { searchDisease };
