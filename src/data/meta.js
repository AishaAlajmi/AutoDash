// File: src/data/meta.js
// Holds the static facility/centers/schools maps and exposes META + FACILITIES
// + a helper to fetch static (gender/authority/stage/total) by school

// ---------- STATIC: مدارس مجمع الملك عبد الله (عينات) ----------
const KAMC = "مجمع الملك عبد الله";

const KAMC_SCHOOLS = [
  // ===== مركز صحي الريان (كامل 25 مدرسة) =====
  { center: "مركز صحي الريان", school: "الطفولة المبكرة بابتدائية الحادية والخمسون بعد المائة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 714 },
  { center: "مركز صحي الريان", school: "قاعدة الملك عبدالله الجوية المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 212 },
  { center: "مركز صحي الريان", school: "قاعدة الملك عبدالله الجوية الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 231 },
  { center: "مركز صحي الريان", school: "المتوسطة السابعة والاربعون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 278 },
  { center: "مركز صحي الريان", school: "الروضة الثانية عشر", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 190 },
  { center: "مركز صحي الريان", school: "الثانوية الرابعة والاربعون - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 237 },
  { center: "مركز صحي الريان", school: "قاعدة الملك عبدالله الجوية الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 247 },
  { center: "مركز صحي الريان", school: "متوسطة الأندلس الأهلية بالحمدانية", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 263 },
  { center: "مركز صحي الريان", school: "الروضة السادسة عشر", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 183 },
  { center: "مركز صحي الريان", school: "مدرسة شرق الاحتراف الابتدائية الاهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 40 },
  { center: "مركز صحي الريان", school: "ثانوية الأندلس الأهلية بالحمدانية مسارات", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 272 },
  { center: "مركز صحي الريان", school: "الأندلس الابتدائية الأهلية للبنات بالحمدانية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 927 },
  { center: "مركز صحي الريان", school: "مدرسة الطفل المستكشف الأهلية صفوف ملحقة", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 60 },
  { center: "مركز صحي الريان", school: "خالد بن سعيد الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 472 },
  { center: "مركز صحي الريان", school: "ثانوية رفيدة الانصارية - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 278 },
  { center: "مركز صحي الريان", school: "الأندلس المتوسطة الأهلية بنات بالحمدانية", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 286 },
  { center: "مركز صحي الريان", school: "الوهج المنير الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 21 },
  { center: "مركز صحي الريان", school: "روضة الأندلس الأهلية بالحمدانية", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 239 },
  { center: "مركز صحي الريان", school: "روضة الطفل المستكشف الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 83 },
  { center: "مركز صحي الريان", school: "متوسطة سلاف الانصارية", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 345 },
  { center: "مركز صحي الريان", school: "ملحق إبتدائي بروضة الوهج المنير الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 127 },
  { center: "مركز صحي الريان", school: "ابتدائية الأندلس الأهلية بالحمدانية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 344 },
  { center: "مركز صحي الريان", school: "الأندلس الثانوية الأهلية للبنات بالحمدانية - مسارات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 295 },
  { center: "مركز صحي الريان", school: "الابتدائية السابعة بعد المئتين", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 757 },
  { center: "مركز صحي الريان", school: "مدرسة شرق الاحتراف الاهلية", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 63 },
  // ===== مركز صحي الشاطى (كامل) =====
  { center: "مركز صحي الشاطى", school: "اكاديمية عالم جدة المتوسطة", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 138 },
  { center: "مركز صحي الشاطى", school: "المرجان المتوسطة العالمية.", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 155 },
  { center: "مركز صحي الشاطى", school: "ملحق ابتدائي بالمرجان العالمية فرع المرجان", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 93 },
  { center: "مركز صحي الشاطى", school: "الفرات النموذجية الأهلية لرياض الأطفال ( مسار دولي )", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 91 },
  { center: "مركز صحي الشاطى", school: "الإبداع الثانوية الأهلية / مسار دولي", gender: "بنات", authority: "عالمي اجنبي", stage: "ثانوي", total: 51 },
  { center: "مركز صحي الشاطى", school: "الابداع المتوسطة الأهلية ( مسار دولي )", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 47 },
  { center: "مركز صحي الشاطى", school: "ثانوية مدارس العرب العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "ثانوي", total: 61 },
  { center: "مركز صحي الشاطى", school: "العرب المتوسطة العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 78 },
  { center: "مركز صحي الشاطى", school: "الفرات النموذجية الإبتدائية الأهلية ( مسار دولي )", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 161 },
  { center: "مركز صحي الشاطى", school: "ابتدائية مدارس العرب العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 216 },
  { center: "مركز صحي الشاطى", school: "الإبداع الإبتدائية الأهلية / ( مسار دولي )", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 128 },
  { center: "مركز صحي الشاطى", school: "ملحق متوسط بمدرسة الفرات النموذجية الإبتدائية الأهلية ( مسار دولي )", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 25 },
  { center: "مركز صحي الشاطى", school: "مدارس العرب الابتدائية العالمية", gender: "بنين", authority: "عالمي اجنبي", stage: "ابتدائي", total: 89 },
  { center: "مركز صحي الشاطى", school: "ثانوية مدارس العرب العالمية", gender: "بنين", authority: "عالمي اجنبي", stage: "ثانوي", total: 60 },
  { center: "مركز صحي الشاطى", school: "مدارس العرب المتوسطة العالمية", gender: "بنين", authority: "عالمي اجنبي", stage: "متوسط", total: 66 },
  { center: "مركز صحي الشاطى", school: "الطفولة المبكرة بابتدائية الثالثة عشرة بعد المئتين", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 404 },
  { center: "مركز صحي الشاطى", school: "الفرات النموذجية الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 160 },
  { center: "مركز صحي الشاطى", school: "الشورى الابتدائية الأهلية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 20 },
  { center: "مركز صحي الشاطى", school: "الإبداع المتوسطة الأهلية", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 110 },
  { center: "مركز صحي الشاطى", school: "متوسطة تحفيظ القرآن الحادية اخر", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 124 }, // إذا كنت تفضل الاسم: "الحادية عشر"
  { center: "مركز صحي الشاطى", school: "الأكاديمية المتطورة الثانوية الأهلية - مسارات", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 89 },
  { center: "مركز صحي الشاطى", school: "الأكاديمية المتطورة الابتدائية الأهلية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 72 },
  { center: "مركز صحي الشاطى", school: "الثريا الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 47 },
  { center: "مركز صحي الشاطى", school: "مدرسة الثريا الاهلية", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 37 },
  { center: "مركز صحي الشاطى", school: "الأكاديمية المتطورة المتوسطة الأهلية", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 79 },
  { center: "مركز صحي الشاطى", school: "الثريا الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 202 },
  { center: "مركز صحي الشاطى", school: "الشورى المتوسطة الأهلية", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 23 },
  { center: "مركز صحي الشاطى", school: "الإبداع الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 75 },
  { center: "مركز صحي الشاطى", school: "ملحق متوسطة الفرات النموذجية الأهلية", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 28 },
  { center: "مركز صحي الشاطى", school: "الثانوية التاسعة والتسعون - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 472 },
  { center: "مركز صحي الشاطى", school: "الروضة الملحقة بالابتدائية136", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 38 },
  { center: "مركز صحي الشاطى", school: "الروضة الخامسة والعشرون", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 128 },
  { center: "مركز صحي الشاطى", school: "المتوسطة الثامنة و التسعون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 338 },
  { center: "مركز صحي الشاطى", school: "الإبداع الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 185 },
  { center: "مركز صحي الشاطى", school: "روضة مواهب الصغار الاهلية صفوف ملحقة", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 0 },
  { center: "مركز صحي الشاطى", school: "الروضة الملحقة بالابتدائية181", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 15 },
  { center: "مركز صحي الشاطى", school: "الإبداع الثانوية الأهلية / - مسارات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 136 },
  { center: "مركز صحي الشاطى", school: "الشورى الثانوية الأهلية - مسارات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 63 },
  { center: "مركز صحي الشاطى", school: "الشعلة الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 17 },
  { center: "مركز صحي الشاطى", school: "الشورى المتوسطة الأهلية", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 30 },
  { center: "مركز صحي الشاطى", school: "الشعلة الثانوية الأهلية - مسارات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 104 },
  { center: "مركز صحي الشاطى", school: "الشعلة الثانوية الاهلية ( كبيرات)", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 1 },
  { center: "مركز صحي الشاطى", school: "الطفولة المبكرة بابتدائية الحادية والثمانون بعد المائة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 347 },
  { center: "مركز صحي الشاطى", school: "الشعلة المتوسطة الأهلية", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 19 },
  { center: "مركز صحي الشاطى", school: "المتوسطة السادسة عشر بعد المئة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 262 },
  { center: "مركز صحي الشاطى", school: "الشورى الثانوية الاهلية - مسارات", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 25 },
  { center: "مركز صحي الشاطى", school: "ابتدائية الاندلس الاهلية بنات - الشاطئ", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 175 },
  { center: "مركز صحي الشاطى", school: "مدارس قرطبه الاهليه للبنين", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 192 },

  // ===== مركز صحي الشراع (كامل) =====
  { center: "مركز صحي الشراع", school: "روضة مملكة الطفولة العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 44 },
  { center: "مركز صحي الشراع", school: "مدرسة رواد الخليج العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 112 },
  { center: "مركز صحي الشراع", school: "رواد الخليج العالمية لرياض الأطفال", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 138 },
  { center: "مركز صحي الشراع", school: "رواد الخليج الثانوية العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "ثانوي", total: 138 },
  { center: "مركز صحي الشراع", school: "روضه مملكه الطفوله العالميه ملحق ابتدائي", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 77 },
  { center: "مركز صحي الشراع", school: "مدارس رواد الخليج الابتدائية العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 365 },
  { center: "مركز صحي الشراع", school: "رواد الخليج الثانوية العالمية بنين", gender: "بنين", authority: "عالمي اجنبي", stage: "ثانوي", total: 154 },
  { center: "مركز صحي الشراع", school: "مدرسة رواد الخليج الابتدائية العالميه", gender: "بنين", authority: "عالمي اجنبي", stage: "ابتدائي", total: 129 },
  { center: "مركز صحي الشراع", school: "مدرسة رواد الخليج المتوسطة العالمية", gender: "بنين", authority: "عالمي اجنبي", stage: "متوسط", total: 122 },
  { center: "مركز صحي الشراع", school: "أكاديمية وعد الابتدائية العالمية.", gender: "بنين", authority: "عالمي اجنبي", stage: "ابتدائي", total: 199 },
  { center: "مركز صحي الشراع", school: "ابن تيمية المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 756 },
  { center: "مركز صحي الشراع", school: "الابتدائية الخامسة والخمسون - صفوف عليا", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 413 },
  { center: "مركز صحي الشراع", school: "الياقوت الأولى الثانوية بنين", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 561 },
  { center: "مركز صحي الشراع", school: "الروضة الملحقة بالابتدائية11", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 212 },
  { center: "مركز صحي الشراع", school: "ابتدائية الشراع الأولى للبنات", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 469 },
  { center: "مركز صحي الشراع", school: "هلال بن امية الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 449 },
  { center: "مركز صحي الشراع", school: "المتوسطة الثالثة و التسعون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 246 },
  { center: "مركز صحي الشراع", school: "عبدالله الثقفي الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 1194 },
  { center: "مركز صحي الشراع", school: "الطفولة المبكرة بالابتدائية الحادية عشر", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 650 },
  { center: "مركز صحي الشراع", school: "الثانوية الثامنة بجدة - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 540 },
  { center: "مركز صحي الشراع", school: "ابتدائية اللؤلؤ الأولى بنين", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 254 },
  { center: "مركز صحي الشراع", school: "الروضة الملحقة بالابتدائية 60", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 80 },
  { center: "مركز صحي الشراع", school: "المتوسطة الثانية و السبعون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 582 },
  { center: "مركز صحي الشراع", school: "رافع بن عميرة الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 420 },
  { center: "مركز صحي الشراع", school: "ابن هشام المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 634 },
  // ===== مركز صحي الصالحية (كامل) =====
  { center: "مركز صحي الصالحية", school: "دار الموهوبين العالمية لرياض الأطفال", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 45 },
  { center: "مركز صحي الصالحية", school: "دار الموهوبين الابتدائية العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 182 },
  { center: "مركز صحي الصالحية", school: "النصر المتوسطة مسار دولي", gender: "بنين", authority: "عالمي اجنبي", stage: "متوسط", total: 35 },
  { center: "مركز صحي الصالحية", school: "النصر الابتدائية مسار دولي", gender: "بنين", authority: "عالمي اجنبي", stage: "ابتدائي", total: 140 },
  { center: "مركز صحي الصالحية", school: "النصر الثانوية مسار دولي", gender: "بنين", authority: "عالمي اجنبي", stage: "ثانوي", total: 63 },
  { center: "مركز صحي الصالحية", school: "عمرو بن امية المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 932 },
  { center: "مركز صحي الصالحية", school: "الصالحية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 0 },
  { center: "مركز صحي الصالحية", school: "المتوسطة الخامسة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 875 },
  { center: "مركز صحي الصالحية", school: "الشبل المتوسطة الأهلية / فرع الصالحية", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 108 },
  { center: "مركز صحي الصالحية", school: "ابي عقيل الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 1121 },
  { center: "مركز صحي الصالحية", school: "الروضة الملحقة بابتدائية ابي أيوب الانصاري", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 144 },
  { center: "مركز صحي الصالحية", school: "المتوسطة الثامنة و الخمسون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 845 },
  { center: "مركز صحي الصالحية", school: "عمرو بن امية المتوسطة-توحد", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 10 },
  { center: "مركز صحي الصالحية", school: "عاصم بن عمرو التميمي الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 834 },
  { center: "مركز صحي الصالحية", school: "الثانوية الخامسة - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 1199 },
  { center: "مركز صحي الصالحية", school: "الابتدائية الثالثة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 1312 },
  { center: "مركز صحي الصالحية", school: "النصر المتوسطة ( فرع الفروسية )الأهلية", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 192 },
  { center: "مركز صحي الصالحية", school: "المنال الثانوية الأهلية - مسارات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 107 },
  { center: "مركز صحي الصالحية", school: "النصر الثانوية الاهلية - فرع الفروسية - مسارات", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 211 },
  { center: "مركز صحي الصالحية", school: "معاوية بن ابي سفيان الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 900 },
  { center: "مركز صحي الصالحية", school: "الليث بن سعد المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 706 },
  { center: "مركز صحي الصالحية", school: "الطفولة المبكرة بابتدائية قيس بن عاصم", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 805 },
  { center: "مركز صحي الصالحية", school: "جعفر بن ابي طالب الابتدائية - دمج توحد", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 16 },
  { center: "مركز صحي الصالحية", school: "الشبل الثانوية الأهلية / فرع الصالحية - مسارات", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 210 },
  { center: "مركز صحي الصالحية", school: "الطفولة المبكرة بابتدائية ابي أيوب الأنصاري", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 970 },
  { center: "مركز صحي الصالحية", school: "النصر الابتدائية الأهلية - فرع الفروسية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 463 },
  { center: "مركز صحي الصالحية", school: "جعفر بن ابي طالب الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 1080 },
  { center: "مركز صحي الصالحية", school: "الروضة الملحقة بابتدائية قيس بن عاصم", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 235 },
  { center: "مركز صحي الصالحية", school: "الشبل الأبتدائية الأهلية / فرع الصالحية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 473 },
  { center: "مركز صحي الصالحية", school: "عمرو بن أمية المتوسطة - دمج فكري", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 7 },
  { center: "مركز صحي الصالحية", school: "بلاط الشهداء الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 1034 },
  { center: "مركز صحي الصالحية", school: "زين العابدين المتوسطة", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 902 },

  // ===== مركز صحي الصواري (كامل) =====
  { center: "مركز صحي الصواري", school: "اكاديمية وعد المتوسطة العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 142 },
  { center: "مركز صحي الصواري", school: "أكاديمية وعد العالمية لرياض الأطفال", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 141 },
  { center: "مركز صحي الصواري", school: "اكاديمية وعد العالمية الابتدائية", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 472 },
  { center: "مركز صحي الصواري", school: "أكاديمية وعد العالمية الثانوية", gender: "بنات", authority: "عالمي اجنبي", stage: "ثانوي", total: 103 },
  { center: "مركز صحي الصواري", school: "أكاديمية وعد المتوسطة العالمية", gender: "بنين", authority: "عالمي اجنبي", stage: "متوسط", total: 184 },
  { center: "مركز صحي الصواري", school: "أكاديمية وعد الثانوية العالمية", gender: "بنين", authority: "عالمي اجنبي", stage: "ثانوي", total: 111 },
  { center: "مركز صحي الصواري", school: "الطفولة المبكرة بابتدائية الصواري الاولى", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 388 },
  { center: "مركز صحي الصواري", school: "متوسطة تحفيظ القرآن الثالثة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 60 },
  { center: "مركز صحي الصواري", school: "الروضة الملحقة بابتدائية الصواري الاولى", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 102 },
  { center: "مركز صحي الصواري", school: "الطفولة المبكرة بابتدائية النموذجية الأولى", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 479 },
  { center: "مركز صحي الصواري", school: "الفتح المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 136 },
  { center: "مركز صحي الصواري", school: "الروضة الملحقة بإبتدائية 102", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 190 },
  { center: "مركز صحي الصواري", school: "الروضة الملحقة بإبتدائية النموذجية الأولى", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 118 },
  { center: "مركز صحي الصواري", school: "المحمدية الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 160 },
  { center: "مركز صحي الصواري", school: "الطفولة المبكرة بابتدائية الثانية بعد المئة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 692 },
  { center: "مركز صحي الصواري", school: "صفوان بن امية الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 165 },

  // ===== مركز صحي الفردوس (كامل) =====
  { center: "مركز صحي الفردوس", school: "الروضة الرابعة والثلاثون", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 116 },
  { center: "مركز صحي الفردوس", school: "ملحق ابتدائية الفرات العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 183 },
  { center: "مركز صحي الفردوس", school: "مدارس الفرات العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 207 },
  { center: "مركز صحي الفردوس", school: "الطفولة المبكرة بابتدائية المئتين", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 701 },
  { center: "مركز صحي الفردوس", school: "المتوسطة الثالثة والعشرون بعد المئة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 342 },
  { center: "مركز صحي الفردوس", school: "سلمة بن قيس المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 519 },
  { center: "مركز صحي الفردوس", school: "ابن حوقل الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 569 },
  { center: "مركز صحي الفردوس", school: "الثانوية الخامسة عشر بعد المائة - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 396 },
  { center: "مركز صحي الفردوس", school: "الثانوية الحادية عشر بعد المائة - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 873 },
  { center: "مركز صحي الفردوس", school: "مدرسة الوردة البيضاء الأهلية الابتدائية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 248 },
  { center: "مركز صحي الفردوس", school: "الروضة الملحقة بالابتدائية 19", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 175 },
  { center: "مركز صحي الفردوس", school: "الوردة البيضاء الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 65 },
  { center: "مركز صحي الفردوس", school: "الفرات العالميه ابتدائي بنات", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 506 },
  { center: "مركز صحي الفردوس", school: "الفرات العالميه متوسطه بنات", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 90 },
  { center: "مركز صحي الفردوس", school: "متوسطه الفرات العالميه بنين", gender: "بنين", authority: "عالمي اجنبي", stage: "متوسط", total: 43 },
  { center: "مركز صحي الفردوس", school: "أبتدائي الفرات العالميه بنين", gender: "بنين", authority: "عالمي اجنبي", stage: "ابتدائي", total: 140 },

  // ===== مركز صحي الماجد =====
  { center: "مركز صحي الماجد", school: "الفيصلية الأهلية الثانوية للبنين المسار الدولي", gender: "بنين", authority: "عالمي اجنبي", stage: "ثانوي", total: 54 },
  { center: "مركز صحي الماجد", school: "الفيصلية المتوسطة الاهلية للبنين ( مسار دولي )", gender: "بنين", authority: "عالمي اجنبي", stage: "متوسط", total: 0 },
  { center: "مركز صحي الماجد", school: "بلاط الشهداء الثانوية- دمج فكري", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 17 },
  { center: "مركز صحي الماجد", school: "الفيصلية الثانوية الاهلية فرع الفلاح - مسارات", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 510 },
  { center: "مركز صحي الماجد", school: "الفيصلية المتوسطة الاهلية فرع الفلاح", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 304 },
  { center: "مركز صحي الماجد", school: "ملحق إبتدائي بروضة منارات الابداع الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 79 },
  { center: "مركز صحي الماجد", school: "مدرسة واحة المبدعين الاهلية صفوف ملحقة", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 167 },
  { center: "مركز صحي الماجد", school: "أجيال الرؤية الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 53 },
  { center: "مركز صحي الماجد", school: "جيل العلا الثانوية الأهلية - مسارات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 162 },
  { center: "مركز صحي الماجد", school: "الفيصلية الثانوية فرع الفلاح-مسارات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 261 },
  { center: "مركز صحي الماجد", school: "الفيصلية الابتدائية (فرع الفلاح ) الاهلية -تربية خاصة", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 120 },
  { center: "مركز صحي الماجد", school: "جيل العلا المتوسطة الأهلية", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 110 },
  { center: "مركز صحي الماجد", school: "منارات الإبداع الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 29 },
  { center: "مركز صحي الماجد", school: "صفوف ملحقة ابتدائية بمدارس الأوائل النموذجيه الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 314 },
  { center: "مركز صحي الماجد", school: "مدارس آية النموذجية الاهلية الابتدائية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 84 },
  { center: "مركز صحي الماجد", school: "الأوائل النموذجية الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 100 },
  { center: "مركز صحي الماجد", school: "معرفة العبير الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 19 },
  { center: "مركز صحي الماجد", school: "الفيصلية الأهلية لرياض الأطفال ( فرع الفلاح )", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 63 },
  { center: "مركز صحي الماجد", school: "الفيصلية الأهلية المرحلة المتوسطة تربيه خاصةفرع الفلاح", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 69 },
  { center: "مركز صحي الماجد", school: "الفيصلية الثانوية - تربية خاصة", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 5 },
  { center: "مركز صحي الماجد", school: "الفيصلية الابتدائية الاهلية فرع الفلاح", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 573 },
  { center: "مركز صحي الماجد", school: "المتوسطة السابعةعشر بعد المئة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 941 },
  { center: "مركز صحي الماجد", school: "مدرسة واحة المبدعين الاهلية", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 43 },
  { center: "مركز صحي الماجد", school: "مدارس آية النموذجية الأهلية رياض أطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 46 },
  { center: "مركز صحي الماجد", school: "بشائر الحجاز الابتدائية الأهلية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 715 },
  { center: "مركز صحي الماجد", school: "الفيصلية الأهلية الثانوية بحي الفلاح تربية خاصة", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 29 },
  { center: "مركز صحي الماجد", school: "الفيصلية الابتدائية الاهلية للبنات ( فرع الفلاح )", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 304 },
  { center: "مركز صحي الماجد", school: "الفيصلية المتوسطة الأهلية تربية خاصة", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 15 },
  { center: "مركز صحي الماجد", school: "مدرسة الفيصلية المتوسطة الاهلية فرع الفلاح", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 217 },
  { center: "مركز صحي الماجد", school: "عالم أبجد الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 71 },
  { center: "مركز صحي الماجد", school: "مدارس زهرة الحكمة المتوسطة الاهلية صفوف ملحقة", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 19 },
  { center: "مركز صحي الماجد", school: "جيل العلا الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 165 },
  { center: "مركز صحي الماجد", school: "مدارس زهرة الحكمة الاهلية رياض الاطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 13 },
  { center: "مركز صحي الماجد", school: "معرفة العبير الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 162 },
  { center: "مركز صحي الماجد", school: "مدرسة زهرة الحكمة الابتدائية الاهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 155 },
  { center: "مركز صحي الماجد", school: "بشائر الحجاز المتوسطة الأهلية", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 176 },
  { center: "مركز صحي الماجد", school: "عالم أبجد الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 129 },
  { center: "مركز صحي الماجد", school: "روضه اجيال الرؤية الاهلية صفوف ملحقة", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 124 },
  { center: "مركز صحي الماجد", school: "برنامج تربية خاصة بمدرسة الفيصلية الابتدائية الاهلية للبنات", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 36 },
  { center: "مركز صحي الماجد", school: "مالك بن عامر الاشعري الابتدائية - دمج فكري", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 24 },
  { center: "مركز صحي الماجد", school: "جيل العلا الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 17 },
  { center: "مركز صحي الماجد", school: "متوسطه جيل العلا", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 102 },


  // ===== مركز صحي أبحر الشمالية (إضافة) =====
  { center: "مركز صحي أبحر الشمالية", school: "الروضة الثالثة والثلاثون", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 190 },

  // ===== مركز صحي الوفاء =====
  { center: "مركز صحي الوفاء", school: "عمر بن أبي ربيعة الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 26 },
  { center: "مركز صحي الوفاء", school: "الروضة الثانية والثلاثون", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 117 },
  { center: "مركز صحي الوفاء", school: "ابتدائية شروق الفكر الاهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 345 },
  { center: "مركز صحي الوفاء", school: "شرحبيل بن حسنة الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 900 },
  { center: "مركز صحي الوفاء", school: "معن بن زائدة المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 760 },
  { center: "مركز صحي الوفاء", school: "الابتدائية الخامسة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 1329 },
  { center: "مركز صحي الوفاء", school: "بدر الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 530 },
  { center: "مركز صحي الوفاء", school: "متوسطة تحفيظ القرآن السادسة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 73 },
  { center: "مركز صحي الوفاء", school: "الابتدائية الحادية والعشرون", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 1142 },
  { center: "مركز صحي الوفاء", school: "المدينة المنورة المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 796 },
  { center: "مركز صحي الوفاء", school: "الطفولة المبكرة بابتدائية الثامنة والعشرون", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 728 },
  { center: "مركز صحي الوفاء", school: "الروضة الملحقة بإبتدائية 28", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 188 },
  { center: "مركز صحي الوفاء", school: "الثانوية الثانية - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 653 },
  { center: "مركز صحي الوفاء", school: "الروضة الملحقة بابتدائية الرياض الأولى", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 244 },
  { center: "مركز صحي الوفاء", school: "مدرسة شروق الفكر الأهلية رياض أطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 95 },
  { center: "مركز صحي الوفاء", school: "الوزيرية الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 755 },
  { center: "مركز صحي الوفاء", school: "متوسطة ام المؤمنين حفصة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 839 },
  { center: "مركز صحي الوفاء", school: "المتوسطة الخامسة و الثمانون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 752 },
  { center: "مركز صحي الوفاء", school: "الثانوية الثانية والعشرون - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 835 },
  { center: "مركز صحي الوفاء", school: "عامر بن واثلة المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 739 },
  { center: "مركز صحي الوفاء", school: "الابتدائية الثانية عشر", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 832 },
  { center: "مركز صحي الوفاء", school: "الامام الشعبي المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 325 },
  { center: "مركز صحي الوفاء", school: "الروضة الملحقة بالابتدائية 12", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 210 },
  { center: "مركز صحي الوفاء", school: "الطفولة المبكرة بابتدائية السادسة عشر", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 920 },
  { center: "مركز صحي الوفاء", school: "الطفولة المبكرة بابتدائية الفروسية الأولى", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 467 },
  { center: "مركز صحي الوفاء", school: "العزيزية الثانوية- - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 613 },
  { center: "مركز صحي الوفاء", school: "الامام الشافعي المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 440 },
  { center: "مركز صحي الوفاء", school: "الابتدائية السادسة والتسعون", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 900 },
  { center: "مركز صحي الوفاء", school: "عبدالله بن انيس الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 821 },
  { center: "مركز صحي الوفاء", school: "الثانوية العاشرة بعد المائة - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 1109 },
  { center: "مركز صحي الوفاء", school: "المروة الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 836 },
  { center: "مركز صحي الوفاء", school: "الثانوية التاسعة والعشرون - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 937 },
  { center: "مركز صحي الوفاء", school: "ابي امامة الباهلي الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 857 },
  { center: "مركز صحي الوفاء", school: "الطفولة المبكرة بإبتدائية الرياض الأولى", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 404 },
  { center: "مركز صحي الوفاء", school: "المتوسطة السادسة و التسعون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 434 },
  { center: "مركز صحي الوفاء", school: "ابتدائية تحفيظ القران السابعة عشر", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 134 },
  { center: "مركز صحي الوفاء", school: "الامام عبدالله بن سعود الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 640 },
  { center: "مركز صحي الوفاء", school: "مالك بن عامر الاشعري الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 1013 },
  { center: "مركز صحي الوفاء", school: "الابتدائية السادسة والعشرون", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 1339 },
  { center: "مركز صحي الوفاء", school: "الروضة الملحقة بابتدائية الفروسية الاولى", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 238 },
  // ===== مركز صحي أبحر الشمالية =====
  { center: "مركز صحي أبحر الشمالية", school: "روضة أكاديمية الحسن العالمية - تربية خاصة", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 7 },
  { center: "مركز صحي أبحر الشمالية", school: "متوسطة أكاديمية الحسن العالمية صفوف ملحقة - تربية حاصة", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 5 },
  { center: "مركز صحي أبحر الشمالية", school: "أكاديمية الحسن الابتدائية العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 202 },
  { center: "مركز صحي أبحر الشمالية", school: "ابتدائية اكاديمية الحسن العالمية تربية خاصة", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 27 },
  { center: "مركز صحي أبحر الشمالية", school: "روضة أكاديمية الحسن العالمية", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 128 },
  { center: "مركز صحي أبحر الشمالية", school: "متوسطة أكاديمية الحسن العالمية صفوف ملحقة", gender: "بنات", authority: "عالمي اجنبي", stage: "متوسط", total: 31 },
  { center: "مركز صحي أبحر الشمالية", school: "رؤية وطن العالمية (ملحق اببتدائي)", gender: "بنات", authority: "عالمي اجنبي", stage: "ابتدائي", total: 28 },
  { center: "مركز صحي أبحر الشمالية", school: "مدارس الولاء الذهبي العالميه", gender: "بنات", authority: "عالمي اجنبي", stage: "رياض أطفال", total: 20 },
  { center: "مركز صحي أبحر الشمالية", school: "المدرسة الفرنسية االابتدائية العالمية", gender: "بنين", authority: "عالمي اجنبي", stage: "ابتدائي", total: 385 },
  { center: "مركز صحي أبحر الشمالية", school: "الضياء المتوسطة الأهلية", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 132 },
  { center: "مركز صحي أبحر الشمالية", school: "الضياء الابتدائية الأهلية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 220 },
  { center: "مركز صحي أبحر الشمالية", school: "الثانوية السابعة بعد المائة - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 307 },
  { center: "مركز صحي أبحر الشمالية", school: "فصول دمج فكري بالابتدائية المائة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 8 },
  { center: "مركز صحي أبحر الشمالية", school: "المتوسطة الحادية والعشرون بعد المئة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 321 },
  { center: "مركز صحي أبحر الشمالية", school: "مجمع ابحر الثانوي - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 466 },
  { center: "مركز صحي أبحر الشمالية", school: "الضياء الثانوية الأهلية - مسارات", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 291 },
  { center: "مركز صحي أبحر الشمالية", school: "الابناء بالدفاع الجوي المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 193 },
  { center: "مركز صحي أبحر الشمالية", school: "النهضة الحديثة الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 54 },
  { center: "مركز صحي أبحر الشمالية", school: "فصول دمج فكري بالمتوسطة التاسعة بعد المائة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 13 },
  { center: "مركز صحي أبحر الشمالية", school: "الابتدائية الثالثة والستون", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 622 },
  { center: "مركز صحي أبحر الشمالية", school: "مكي بن ابي طالب الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 537 },
  { center: "مركز صحي أبحر الشمالية", school: "الابناء بالدفاع الجوي الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 182 },
  { center: "مركز صحي أبحر الشمالية", school: "المتوسطة التاسعة بعد المئة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 393 },
  { center: "مركز صحي أبحر الشمالية", school: "زيد بن عمير الكندي المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 384 },
  { center: "مركز صحي أبحر الشمالية", school: "روضة غراس المستقبل الأهلية", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 0 },
  { center: "مركز صحي أبحر الشمالية", school: "مدرسة غراس المستقبل الاهليه صفوف ملحقة", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 170 },
  { center: "مركز صحي أبحر الشمالية", school: "مجمع ابحر المتوسط", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 450 },
  { center: "مركز صحي أبحر الشمالية", school: "المتوسطة التاسعة والاربعون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 217 },
  { center: "مركز صحي أبحر الشمالية", school: "مجمع ابحر الابتدائي", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 463 },
  { center: "مركز صحي أبحر الشمالية", school: "الروضة الملحقة بالابتدائية100", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 33 },
  { center: "مركز صحي أبحر الشمالية", school: "الابتدائية الخمسون بعد المائة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 301 },
  { center: "مركز صحي أبحر الشمالية", school: "الطفولة المبكرة بابتدائية المائة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 524 },

  // ===== مركز صحي بريمان =====
  { center: "مركز صحي بريمان", school: "زيد الخير الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 0 },
  { center: "مركز صحي بريمان", school: "الثانوية الحادية والسبعون - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 492 },
  { center: "مركز صحي بريمان", school: "الامام الشوكاني الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 720 },
  { center: "مركز صحي بريمان", school: "الابتدائية التاسعة بعد المئتين", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 924 },
  { center: "مركز صحي بريمان", school: "الثانوية السابعة والخمسون - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 373 },
  { center: "مركز صحي بريمان", school: "القعقاع بن عمرو المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 617 },
  { center: "مركز صحي بريمان", school: "عمران بن الحصين الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 0 },
  { center: "مركز صحي بريمان", school: "الابتدائية التاسعة والاربعون بعد المئة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 0 },
  { center: "مركز صحي بريمان", school: "المتوسطة الرابعة و الخمسون", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 416 },
  { center: "مركز صحي بريمان", school: "المتوسطة الثانية بعد المئة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 386 },

  // ===== مركز صحي ثول =====
  { center: "مركز صحي ثول", school: "متوسطة ثول", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 200 },
  { center: "مركز صحي ثول", school: "الطبراني الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 156 },
  { center: "مركز صحي ثول", school: "ثول الثانوية-دمج فكري", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 2 },
  { center: "مركز صحي ثول", school: "ثانوية ثول - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 207 },
  { center: "مركز صحي ثول", school: "الطفولة المبكرة بابتدائية الحسين بن علي", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 107 },
  { center: "مركز صحي ثول", school: "ثول المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 195 },
  { center: "مركز صحي ثول", school: "ثول الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 205 },
  { center: "مركز صحي ثول", school: "الطفولة المبكرة بابتدائية ثول الاولى", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 340 },
  { center: "مركز صحي ثول", school: "الابتدائية الرابعة والستون بثول", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 88 },
  { center: "مركز صحي ثول", school: "روضه ثول الاولى", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 98 },

  // ===== مركز صحي خالد النموذجي =====
  { center: "مركز صحي خالد النموذجي", school: "منارات النخبة الابتدائية الأهلية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 208 },
  { center: "مركز صحي خالد النموذجي", school: "برنامج تربية خاصة بمدرسة روضه الورود المشرقة", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 0 },
  { center: "مركز صحي خالد النموذجي", school: "المتوسطة السادسة عشر", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 386 },
  { center: "مركز صحي خالد النموذجي", school: "الفزاري المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 743 },
  { center: "مركز صحي خالد النموذجي", school: "الطفولة المبكرة بابتدائية الخامسة والستون", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 746 },
  { center: "مركز صحي خالد النموذجي", school: "الروضة الملحقة بإبتدائية زيد بن الخطاب", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 191 },
  { center: "مركز صحي خالد النموذجي", school: "سفراء المستقبل الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 98 },
  { center: "مركز صحي خالد النموذجي", school: "روضة الورود المشرقة الأهلية لرياض الأطفال", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 18 },
  { center: "مركز صحي خالد النموذجي", school: "برنامج تربية خاصة بمدرسة روضة الورود المشرقة الإبتدائية الأهلية", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 16 },
  { center: "مركز صحي خالد النموذجي", school: "المتوسطة الثانية عشر بعد المئة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 456 },
  { center: "مركز صحي خالد النموذجي", school: "الامام النووي الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 207 },
  { center: "مركز صحي خالد النموذجي", school: "روضة طيبة الاولى", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 288 },
  { center: "مركز صحي خالد النموذجي", school: "الطفولة المبكرة بابتدائية زيد بن الخطاب", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 782 },
  { center: "مركز صحي خالد النموذجي", school: "المتوسطة الثانية عشر", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 432 },
  { center: "مركز صحي خالد النموذجي", school: "الثانوية الثامنة والتسعون نظام- مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 601 },
  { center: "مركز صحي خالد النموذجي", school: "الفزاري الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 745 },
  { center: "مركز صحي خالد النموذجي", school: "الروضة الملحقة بابتدائية الملك فيصل", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 130 },
  { center: "مركز صحي خالد النموذجي", school: "روضة إبداع الأجيال الأهلية", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 17 },
  { center: "مركز صحي خالد النموذجي", school: "الطفولة المبكرة بابتدائية الملك فيصل", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 805 },
  { center: "مركز صحي خالد النموذجي", school: "عمرو بن العاص الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 315 },
  { center: "مركز صحي خالد النموذجي", school: "الثانوية الثانية والستون - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 686 },
  { center: "مركز صحي خالد النموذجي", school: "روضة إبداع الاجيال الأهلية صفوف ملحقة", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 130 },
  { center: "مركز صحي خالد النموذجي", school: "ملحق إبتدائي بروضة الورود المشرقة", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 39 },
  { center: "مركز صحي خالد النموذجي", school: "الروضة الملحقة بإبتدائية 65", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 192 },
  { center: "مركز صحي خالد النموذجي", school: "الربيع بن زياد الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 487 },
  { center: "مركز صحي خالد النموذجي", school: "سفراء المستقبل الاهليه", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 45 },
  { center: "مركز صحي خالد النموذجي", school: "روضة إبداع الأجيال الأهلية صفوف ملحقة وتربية خاصه", gender: "بنات", authority: "اهلي", stage: "ابتدائي", total: 4 },
  { center: "مركز صحي خالد النموذجي", school: "فصول دمج فكري بالطفولة المبكرة ب / 65", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 4 },
  { center: "مركز صحي خالد النموذجي", school: "الابتدائية الثالثة والسبعون بعد المائة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 816 },

  // ===== مركز صحي ذهبان =====
  { center: "مركز صحي ذهبان", school: "الفارابي الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 437 },
  { center: "مركز صحي ذهبان", school: "الطفولة المبكرة بروضة ذهبان", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 0 },
  { center: "مركز صحي ذهبان", school: "ذهبان المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 230 },
  { center: "مركز صحي ذهبان", school: "الطفولة المبكرة بابتدائية ذهبان", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 409 },
  { center: "مركز صحي ذهبان", school: "روضة ذهبان الثانية", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 146 },
  { center: "مركز صحي ذهبان", school: "ثانوية ذهبان - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 236 },
  { center: "مركز صحي ذهبان", school: "متوسطة ذهبان", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 256 },
  { center: "مركز صحي ذهبان", school: "روضة ذهبان الاولى", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 0 },
  { center: "مركز صحي ذهبان", school: "ذهبان الثانوية - مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 320 },
];
// Auto-generated from Excel with facility added
export const KFIS = "م. ا فهد مع المدارس العالمية";
export const KFIS_SCHOOLS = [
  {
    "center": "مركز صحي البوادي 1",
    "school": "الروضة الملحقة بإبتدائية 116",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 87,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الروضة الخامسة والثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 75,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الروضة السابعة والعشرون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 176,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الروضة الملحقة بإبتدائية النموذجية الرابعة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 57,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الطفولة المبكرة بإبتدائية النموذجية الرابعة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 890,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الابتدائية الثامنة والتسعون - صفوف عليا",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 773,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "ابتدائية تحفيظ القران الحادية عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 116,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الابتدائية الخامسة والستون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 304,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الطفولة المبكرة بابتدائية السادسة عشر بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 560,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "التعليم الاول الابتدائية الأهلية صفوف ملحقة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 56,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الامير سلطان بن سلمان الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 580,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "المتوسطة الستون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 534,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "المتوسطة الحادية و العشرون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 485,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الثانوية السادسة والثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 570,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 1",
    "school": "الثانوية الثامنة والثمانون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 643,
    "facility": "مركز صحي البوادي 1"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الروضة الثامنة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 99,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الروضة الملحقة بإبتدائية عمير بن وهب",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 157,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "شركة متوسطة البوادي للتعليم رياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 6,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "بيت الطفل الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 21,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الفلك المنير الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 50,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الطفولة المبكرة بابتدائية السبعون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 686,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الطفولة المبكرة بابتدائية عمير بن وهب",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 836,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "شركة متوسطة البوادي للتعليم الابتدائي",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 64,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "بيت الطفل الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 124,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الفلك المنير الإبتدائية الأهلية لتحفيظ القرآن",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 123,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "المتوسطة الثالثة والاربعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 346,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "شركة متوسطة البوادي للتعليم المتوسطة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 39,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "بيت الطفل المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 34,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الفلك المنير المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 15,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الامير تركي بن عبدالعزيز المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 670,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "المجد المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 105,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الثانوية السابعة عشرة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 447,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الثانوية الخمسون بجدة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 629,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "شركة متوسطة البوادي للتعليم - الثانوي",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 98,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الفلك المنير الثانوية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 72,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "النهروان الثانوية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 711,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الحكماء العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 51,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الحكماء الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 244,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "الحكماء المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 62,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "ثانوية الحكماء العالمية-بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 58,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "سدر العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 105,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "سدر الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 567,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "سدر المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 83,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "سدر الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 58,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "سدر الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 105,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "سدر المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 128,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "سدر العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 80,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة الثالثة و الخمسون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 73,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة الملحقة بالابتدائية 106",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 55,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة السابعة و الاربعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 152,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة الملحقة بالابتدائية171",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 35,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة الثامنة والعشرون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 175,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة التاسعة و الاربعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 75,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة الاربعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 73,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الروضة الملحقة بابتدائية الأمير متعب بن عبد العزيز",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 238,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الابتدائية الثامنة بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 634,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الطفولة المبكرة بابتدائية الثلاثون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 834,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "رياض البراءة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 76,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "أسيد بن حضير الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 518,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الخيف الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 870,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الطفيل بن عمرو الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 75,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "سعد بن عبادة الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 355,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "النموذجية الثالثة الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 530,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "عمير بن سعد الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 743,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "حافظ الحكمي الابتدائية لتحفيظ القران الكريم",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 55,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الساحل الابتدائية الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 258,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الاخلاص الابتدائية الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 241,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "دار الثقافة الابتدائية الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 409,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "جيل الفيصل الابتدائية ( فرع الصفا ) الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 160,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "المتوسطة السابعة و الثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 526,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "المتوسطة الرابعة و السبعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 639,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "عكرمة بن ابي جهل المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 307,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "اسد بن الفرات المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 360,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "المسعودي المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 578,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "البحتري المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 352,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الحديثة المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 540,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "صهيب بن سنان المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 985,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "جيل الفيصل المتوسطة ( فرع الصفا ) الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 131,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الاخلاص المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 112,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الساحل المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 202,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "دار الثقافة المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 249,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الثانوية الثانية والاربعون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 588,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الثانوية السابعة والاربعون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 550,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الامير مشعل بن ماجد الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 800,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "علي بن ابي طالب الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 914,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "عمر بن الخطاب الثانوية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 937,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "رضوى الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 800,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "دار الثقافة الثانوية الأهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 453,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "المنهل الثقافي الثانوية الأهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 300,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "الإخلاص الثانوية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 234,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "جيل الفيصل الثانوية (فرع الصفا ) الاهلية - مسارات",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 234,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "ابتدائية الأنهار الدولية للتعليم",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 108,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 1",
    "school": "متوسطة الأنهار الدولية للتعليم",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 38,
    "facility": "مركز صحي الصفا 1"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفل المثالي الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 9,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفولة المبكرة بابتدائية الحادية والتسعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 694,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الابتدائية الحادية والاربعون بعد المئة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 482,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الابتدائية الثمانون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 318,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الابتدائية السابعة والعشرون- صفوف عليا",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 562,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفولة المبكرة بابتدائية ذات الصواري",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 1012,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الابتدائية السادسة والثمانون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 410,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفولة المبكرة بابتدائية السادسة بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 743,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفولة المبكرة بابتدائية تحفيظ القران الخامسة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 476,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفولة المبكرة بابتدائية الأمير متعب بن عبدالعزيز",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 842,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الابتدائية الرابعة والثمانون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 700,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفولة المبكرة بابتدائية الحادية والسبعون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 498,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "دار الفرح الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 109,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "اكاديمية المعارف الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 300,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفل المثالي الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 93,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "مدرسة الحسون الابتدائية صفوف ملحقة.",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 40,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "ملحق إبتدائي بروضة الرائدة النموذجية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 167,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الآمال المبدعة الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 85,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "براعم الوطن الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 149,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "متوسطة تحفيظ القرآن الخامسة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 223,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "المتوسطة الثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 426,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "المتوسطة السادسة و الثمانون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 413,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "المتوسطة الخامسة والاربعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 559,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "المتوسطة السادسة و الستون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 598,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "فتاة المستقبل المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 35,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "اكاديمية المعارف المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 124,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "دار الفرح المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 79,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "براعم الوطن المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 62,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفل المثالي المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 73,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الامام فيصل بن تركي المتوسطة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 495,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الثانوية الثانية والثلاثون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 557,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الثانوية الثالثة والخمسون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 838,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الثانوية التاسعة والثمانون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 602,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "اكاديمية المعارف الثانوية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 235,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الطفل المثالي الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 185,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "فتاة المستقبل الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 116,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "دار الفرح الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 227,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "اكاديمية المعارف الإبتدائية الأهلية ( مسار مصري )",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "ابتدائي",
    "total": 139,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "اكاديمية المعارف المتوسطة الأهلية ( مسار مصري )",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "متوسط",
    "total": 59,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الشعاع العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "رياض أطفال",
    "total": 65,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "مدرسة ساره العالمية",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "ابتدائي",
    "total": 336,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "الشعاع الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "ابتدائي",
    "total": 236,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الصفا 2",
    "school": "لؤلؤة الكنوز الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "ابتدائي",
    "total": 43,
    "facility": "مركز صحي الصفا 2"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الروضة الملحقة بابتدائية عمر بن الخطاب",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 40,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الروضة الملحقة بابتدائية المنصورية",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 138,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الروضة السادسة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 251,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الروضة الحادية و الخمسون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 75,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الروضة الملحقة بالابتدائية35",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 22,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "المبتكرة الصغيرة الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 20,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "النبراس الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 51,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الطفولة المبكرة بابتدائية الثانية والتسعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 598,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الطفولة المبكرة بابتدائية عمر بن الخطاب",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 842,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الابتدائية الثانية - صفوف عليا",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 866,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الطفولة المبكرة بابتدائية الخامسة والثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 408,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الطفولة المبكرة بإبتدائية المنصورية",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 836,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "معهد التربية الفكرية/1 الابتدائي",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 17,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "النبراس الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 190,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "المبتكرة الصغيرة الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 129,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "ابي بن كعب الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 452,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "ابن الجزري الابتدائية لتحفيظ القران الكريم",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 359,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "النموذجية الثانية الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 530,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أنجال الصفوة الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 54,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "ثغر جدة الابتدائية الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 107,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أنجال العقيق المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 51,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "المتوسطة الثالثة و السبعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 723,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "معهد التربية الفكرية/1 المتوسط",
    "gender": "بنبن",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 17,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "متوسطة المبتكرة الصغيرة صفوف ملحقة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 21,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "معهد التربية الفكرية/1 المتوسط",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 43,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الحسن بن علي المتوسطة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 695,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الامير خالد بن فهد المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 588,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "انجال الصفوة المتوسطة الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 208,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أنجال العقيق الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 45,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "ثغر جدة المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 62,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الثانوية الرابعة والخمسون بجدة - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 802,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الثانوية الخامسة والسبعون - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 701,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "معهد التربية الفكرية/1 الثانوي",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 40,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "ام القرى الثانوية - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 655,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "بدر الثانوية - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 594,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "خالد بن الوليد الثانوية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 677,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "ثغر جدة الثانوية الاهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 82,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "انجال الصفوة الثانوية الاهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 300,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أنجال العقيق الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 87,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الأفكار العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 35,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الأفكار الابتدائية العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 187,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الأفكار المتوسطة العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 21,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الوادي الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 678,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الوادي المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 159,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الوادي الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 124,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أكاديمية جدة الابتدائية العالمية للبنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 389,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أكاديمية جدة المتوسطة العالمية للبنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 57,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أكاديمية جدة الثانوية العالمية للبنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 26,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الوادي المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 211,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "الوادي العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 131,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أكاديمية جدة العالمية - ابتدائي بنين",
    "gender": "بنبن",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 50,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أكاديمية جدة المتوسطة العالمية للبنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 58,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "أكاديمية جدة الثانوية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 34,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة الملحقة بالابتدائية87",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 19,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة الملحقة بالابتدائية58",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 66,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة الرابعة عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 135,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة الثالثة والعشرون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 90,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة التاسعة عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 98,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة الملحقة بالابتدائية88",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 16,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة الرابعة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 92,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الروضة الملحقة بمجمع السلامة الابتدائي",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 83,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مركز التوحد",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 88,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "حطين الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 90,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المستقبل الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 46,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "دار الفرسان الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 80,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية الثامنة والخمسون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 626,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بإبتدائية الخالدية",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 817,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية الخامسة والاربعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 713,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية النموذجية / 7",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 713,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية التاسعة والتسعون",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 820,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد الأمل/1 الابتدائي",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 18,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية التاسعة والتسعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 820,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية السابعة والثمانون",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 497,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ابتدائية الموهوبات",
    "gender": "بنبن",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 117,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مركز التوحد الابتدائي",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 88,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية بمجمع السلامة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 726,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية الثامنة والثمانون",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 350,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الابتدائية الثانية والعشرون بعد المائة - صفوف عليا",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 847,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الابتدائية الخامسة والاربعون بعد المئة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 322,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الطفولة المبكرة بابتدائية تحفيظ القران الثانية عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 262,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "دار الفرسان الإبتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 274,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المستقبل الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 240,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ملحق إبتدائي بروضة لين الامتيازات الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 31,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "صفوف ملحقة بروضة البشائر الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 56,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "حطين الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 260,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المتوسطة السابعة و السبعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 426,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مجمع الامير سلطان الابتدائي",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 677,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الامام شعبة بن عياش الابتدائية لتحفيظ القران الكريم",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 91,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "اليمامة الابتدائية",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 496,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد الامل الابتدائي",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 11,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد التربية الفكرية الابتدائي 1",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 124,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "دار الفرسان الابتدائية الأهلية بنين",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 113,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "روضة جدة الابتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 98,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "تهامة البحر الابتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 38,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الرحمة الابتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 65,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الأنجال الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 86,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدارس ريادة التميز الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 132,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المشرق الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 60,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المتوسطة التاسعة و الستون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 262,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المتوسطة الخامسة و التسعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 360,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة الموهوبات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 152,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المتوسطة الثامنة و السبعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 667,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة تحفيظ القرآن الثانية",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 154,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المتوسطة السابعة والعشرون بعد المئة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 318,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المتوسطة الثامنة عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 522,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المتوسطة الثانية و الثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 340,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد الأمل/1 المتوسط",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 9,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "دار الفرسان المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 115,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "حطين المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 60,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "النهى المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 48,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المستقبل المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 136,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مجمع الامير سلطان المتوسط",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 720,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الامام ورش المتوسطة لتحفيظ القران الكريم",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 372,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الملك فهد المتوسطة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 604,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مجمع السلامة المتوسط",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 446,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد الامل المتوسط",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 6,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "محمد بن علي بن ابي طالب المتوسطة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 373,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الرحمة المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 42,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الأنجال المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 51,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدارس ريادة التميز المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 97,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "دار الفرسان المتوسطة الأهلية بنين",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 103,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "روضة جدة المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 76,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الثانوية الخامسة والثلاثون - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 770,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الثانوية الحادية والاربعون - مسارات",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "ثانوي",
    "total": 394,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الثانوية السابعة والثمانون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 283,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الثانوية الثالثة عشر بجدة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 562,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية الموهوبات ( ) - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 200,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الثانوية السابعة والعشرون بجدة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 664,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد الأمل/1 الثانوي - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 16,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "روضة جدة النموذجية الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 261,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "النهى الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 50,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية دار الفرسان الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 92,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المستقبل الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 149,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "حطين الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 60,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الزهراوي الثانوية - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 804,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مجمع السلامة الثانوي - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 540,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مجمع الامير سلطان الثانوي - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 937,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد الامل الثانوي - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 14,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "معهد التربية الفكرية الثانوي 1",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 40,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية دار الفرسان الاهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 94,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المشرق الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 93,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدارس ريادة التميز الثانوية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 185,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الأنجال الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 47,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "روضة انجالي المتخصصة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 36,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "روضة ثامر العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 95,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثامر الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 691,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثامر المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 233,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثامر الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 182,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "النبلاء العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 44,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ابتدائية النبلاء العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 410,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدرسة النبلاء العالمية المتوسطة",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 120,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية النبلاء العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 75,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدرسة مملكتي الصغيرة العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 44,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مملكتي الصغيرة الإبتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 96,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مملكتي الصغيرة المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 21,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مملكتي الصغيرة الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 12,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الفخامة العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 49,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ابتدائية الفخامة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 268,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة الفخامة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 49,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية الفخامة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 49,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ابتدائية الأندلس العالمية - بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 335,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة الأندلس العالمية - بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 115,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية الأندلس العالمية - بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 85,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المرجان الابتدائية العالمية.",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 315,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المرجان المتوسطة العالمية.",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 155,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المرجان الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 155,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "جزيرة العلوم الإبتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 211,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "جزيرة العلوم المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 130,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "جزيرة العلوم الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 119,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "دار الفرسان الإبتدائية الأهلية ( مسار دولي )",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 132,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة دار الفرسان الأهلية - مسار دولي",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 31,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "روضة المعرفة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 288,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ابتدائية المعرفة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 50,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة المعرفة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 60,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية المعرفة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 99,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدارس عالم الصغار العالمية-المرحلة الابتدائية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 215,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدارس عالم الصغار العالمية - المرحلة المتوسطة",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 69,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدارس عالم الصغار العالمية - المرحلة الثانوية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 47,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ابتدائية جيل الندي العالمية(صفوف ملحقه)",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 269,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثامر الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 158,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثامر المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 272,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثامر الثانوية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 269,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة النبلاء العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 120,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "النبلاء العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 88,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المعرفة العالمية المتوسطة",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 348,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "مدارس دار الفرسان الابتدائية الاهلية بنين - مسار دولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 64,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة دار الفرسان الاهلية دبلوما",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 22,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الأنجال الابتدائية مسار دولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 57,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الأنجال المتوسطة مسار دولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 49,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "الأنجال الثانوية الأهلية مسار دولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 59,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "إبتدائية دار جنى العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 384,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "متوسطة دار جنى العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 419,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "ثانوية دار جنى العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 388,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المشرق الابتدائية المسار المصري",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 81,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المشرق المتوسطة المسار المصري",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 47,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المشرق الثانوية المسار المصري",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 3,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المرجان الابتدائية العالمية.",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 120,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المرجان المتوسطة العالمية.",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 148,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي السلامة",
    "school": "المرجان العالمية الثانوية.",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 138,
    "facility": "مركز صحي السلامة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الثامنة و الخمسون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 55,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الملحقة بالابتدائية90",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 85,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الملحقة بابتدائية عبدالملك بن مروان",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 113,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الاولى",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 540,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الملحقة بالابتدائية 161",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 40,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الخامسة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 126,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الخامسة عشر",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 130,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الروضة الحادية والاربعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 90,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الطفولة المبكرة بابتدائية عبدالملك بن مروان",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 744,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الطفولة المبكرة بابتدائية النعمان بن بشير",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 367,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الابتدائية السبعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 835,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الطفولة المبكرة بابتدائية النموذجية الأولى",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 473,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الطفولة المبكرة بابتدائية التسعون",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 496,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الابتدائية السابعة والثلاثون - صفوف عليا",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 755,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الطفولة المبكرة بابتدائية الثمانون",
    "gender": "بنبن",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 572,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الابتدائية السابعة والخمسون - صفوف عليا",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 559,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الطفولة المبكرة بابتدائية الثانية والستون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 625,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الطفولة المبكرة بابتدائية الحادية والستون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 613,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "النموذجية السادسة الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 469,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "صقر قريش الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 400,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "ابي الدرداء الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 360,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "التقدم الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 835,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "صرح منارة المستقبل الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 154,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "العقيق النموذجية الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 350,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الاخاء الابتدائية الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 180,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "أنجال الفكر الابتدائية الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 214,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "المتوسطة الثامنة و العشرون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 613,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "المتوسطة السابعة بعد المئة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 512,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "المتوسطة الحادية عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 367,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "المتوسطة الحادية و الثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 525,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "المتوسطة الاولى بعد المئة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 205,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الفاروق المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 800,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "ابن كثير المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 720,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الفيصلية المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 175,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الشروق المتوسطة الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 101,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "صرح منارة المستقبل المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 73,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "العقيق المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 179,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "ملحق متوسط بإبتدائية أنجال الفكر الاهلية فرع شارع الأمير ماجد",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 85,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الاخاء المتوسطة الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 137,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الثانوية المئة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 416,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الثانوية السادسة عشر - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 238,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الثانوية الرابعة عشر بجدة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 671,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الثانوية السابعة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 567,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الثانوية الخامسة والثمانون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 663,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "ابن خلدون الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 853,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الفيصلية الثانوية للموهوبين - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 202,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "عرفات الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 840,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "بلادي الابتدائية العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 149,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "حراء الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 308,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "حراء المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 51,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "مدرسة الدعاء الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 193,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "مدرسة الدعاء المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 49,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الحجاز العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 66,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الحجاز الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 222,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الحجاز المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 66,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "التقدم الرائدة المتوسطة الأهلية ( مسار مصري )",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 142,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "عبق العلم الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 249,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "عبق العلم المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 53,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "اهداب الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 101,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "اهداب المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 35,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "دوحة العلوم العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 83,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "دوحة العلوم الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 189,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "دوحة العلوم المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 18,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "المحيط الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 253,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "المحيط المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 36,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "مدرسة معارف العلم للتعليم الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 245,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "دوحة العلوم الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 63,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "دوحة العلوم المتوسطة",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 18,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "عبق العلم الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 179,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "عبق العلم المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 78,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الحجاز الابتدائية العالميه",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 91,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الحجاز المتوسطة العالميه",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 54,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الموارد الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 23,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الموارد الرائدة العالمية المتوسطة",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 65,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الموارد الرائدة العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 122,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "حراء الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 28,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "حراء المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 61,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "بلادي الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 14,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "بلادي المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 59,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الحكماء المتوسطة العالمية.",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 79,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الحكماء العالمية الثانوية.",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 115,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الدعاء الابتدائية العالمية-بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 127,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الدعاء المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 91,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "أهداب المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 97,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "أهداب الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 54,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الاخاء المتوسطة الأهلية - مسار دولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 186,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الاخاء الابتدائية الأهلية - مسار دولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 268,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "الإخاء الثانوية الأهلية - المسار الدولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 169,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "صرح منارة المستقبل الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 114,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي مشرفة",
    "school": "العقيق الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 242,
    "facility": "مركز صحي مشرفة"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الروضة الملحقة بابتدائية عون بن الحارث",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 50,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الروضة السابعة والثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 53,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الروضة الملحقة بالإبتدائية 155",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 38,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المفكر الصغير الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 66,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "نور الإيمان الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 125,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الطفولة المبكرة باابتدائية النعيم",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 437,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الطفولة المبكرة بابتدائية عون بن الحارث",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 698,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الطفولة المبكرة بابتدائية الخامسة والخمسون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 633,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الملك عبدالعزيز الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 154,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "عثمان بن مظعون الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 124,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مجمع الامير محمد بن سعود الكبير الابتدائي",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 230,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "رائدات المستقبل الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 118,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "صناع الغد الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 50,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مدرسة الرواد المطورة الأهلية صفوف ملحقة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 56,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مدارس دار الذكر الابتدائية الأهلية صفوف ملحقة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 96,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المفكر الصغير الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 156,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "روضة ارتقاء جدة الاهلية صفوف ملحقة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 22,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "نور الإيمان الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 375,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "اهلية البيان الابتدائية ( النعيم ) الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 123,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "دار الذكر الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 100,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الأكاديمية المتطورة الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 72,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الشبل الابتدائية الأهلية / فرع المحمدية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 59,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المتوسطة الخامسة و الستون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 355,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المتوسطة التاسعة و السبعون",
    "gender": "بنات",
    "authority": "عالمي",
    "stage": "متوسط",
    "total": 346,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المتوسطة الرابعة والعشرون بعد المئة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 210,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "ربيعة بن كعب المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 404,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مجمع الامير محمد بن سعود الكبير المتوسط",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 530,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "نور الإيمان المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 173,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المفكر الصغير المتوسطة الأهلية صفوف ملحقة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 26,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "صناع الغد المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 34,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "رائدات المستقبل المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 118,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الأكاديمية المتطورة المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 79,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "دار الذكر المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 282,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "أهلية البيان المتوسطة (النعيم) الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 78,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الثانوية الحادية والستون بجدة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 359,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الثانوية السادسة بعد المائة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 256,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الثانوية السابعة والستون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 357,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "محمد بن ادريس الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 500,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مجمع الامير محمد بن سعود الكبير الثانوي - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 542,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "نور الايمان الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 293,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "رائدات المستقبل الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 145,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "قرطبة الثانوية الاهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 452,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "دار الذكر الثانوية الاهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 382,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الكوثر العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 62,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مدارس الكوثر الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 215,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الكوثر المتوسطةالعالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 80,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مدارس الكوثر الثانويةالعالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 64,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "براعم الازهار العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 104,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "براعم الأزهار العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 124,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "ابتدائية البساط الأخضر العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 168,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مرام الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 89,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مرام المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 28,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المكتشف النموذجيه الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 473,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "المكتشف النموذجيه المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 81,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مدرسة العقول المفكرة العالمية صفوف ملحقة",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 60,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "معرفة ابحر العالمية لرياض الاطفال المحمدية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 14,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "معرفة ابحر العالمية المحمدية.",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 51,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الكوثر الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 68,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الكوثر المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 65,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مدارس الكوثر الثانوية العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 67,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "ابتدائية مدارس المكتشف العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 537,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "متوسطة مدارس المكتشف العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 433,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "ثانوية مدارس المكتشف العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 345,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "مدارس دار الذكر الأهلية للبنين-مسار دولي",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 91,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروضة الملحقة بإبتدائية خزيمة بن ثابت",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 110,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروضة الثامنة عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 150,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروضة السادسة والعشرون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 150,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "دار الحنان الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 74,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "زهرة الربيع الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 52,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الخطوة الاولى الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 28,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الاذكياء الصغار الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 150,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الابتدائية الثامنة والسبعون",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 370,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الطفولة المبكرة بإبتدائية خزيمة بن ثابت",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 700,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الابتدائية التاسعة والثلاثون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 540,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الطفولة المبكرة بابتدائية الثالثة والثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 820,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مجمع الثغر الابتدائي - الخالدية",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 459,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "خزيمة بن ثابت الابتدائية",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 223,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "عبادة بن قيس الانصاري الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 555,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الامام ابي عمرو البصري الابتدائية لتحفيظ القران الكريم",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 120,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس الخضراء الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 440,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "دار الحنان الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 243,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "زهرة الربيع الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 133,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ملحق إبتدائي بروضة الأذكياء الصغار الاهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 101,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الخطوة الاولى الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 29,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس الإبتدائية الأهلية لتحفيظ القرآن الكريم",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 153,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ملحق إبتدائي بروضة الرائد الصغير الاهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 44,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ملحق إبتدائي بروضة الصدفة المكنونة",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 35,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "قرطبة الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 523,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 673,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الحجاز الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 123,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "المتوسطة الثالثة و الثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 504,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "المتوسطة الحادية و التسعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 222,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الشيخ عبدالله الخليفي المتوسطة لتحفيظ القران الكريم",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 81,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الانصار المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 792,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مجمع الثغر المتوسط - الخالدية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 467,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "محمد بن القاسم المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 408,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "زهرة الربيع المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 63,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس المتوسطة الأهلية لتحفيظ القرآن الكريم - بنات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 56,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "دار الحنان المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 132,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس الخضراء المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 200,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 318,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الحجاز المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 99,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "قرطبة المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 304,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الثانوية الحادية والخمسون بجدة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 433,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الثانوية الخامسة والستون بجدة - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 504,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس الخضراء الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 317,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "دار الحنان الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 83,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "اشبيلية الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 727,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مجمع الثغر الثانوي - الخالدية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 504,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الاندلس الثانوية الأهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 226,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الحجاز الثانوية الأهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 565,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الكون المطوره العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 48,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الكون المطوره الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 229,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الكون المطوره المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 75,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ثانوية الكون المطوره العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 105,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروابي الخضراء العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 73,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروابي الخضراء الابتدائية العالمية.",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 327,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروابي الخضراء المتوسطة العالمية.",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 78,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروابي الخضراء الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 130,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "دار جنى العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 364,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "إبتدائية دار جنى العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 1102,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "متوسطة دار جنى العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 456,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ثانوية دار جنى العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 398,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "جسر التعليم العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 118,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ملحق ابتدائي بروضة جسر التعليم العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 65,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "جدة الخاصة العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 70,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ابتدائية جدة الخاصة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 280,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "جدة الخاصة المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 54,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "جدة الخاصة العالمية الثانوية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 59,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة جدة العالمية - قسم الروضة",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 140,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة جدة العالمية - قسم الابتدائي",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 576,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة جدة العالمية - قسم المتوسط",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 173,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة جدة العالمية - القسم الثانوي",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 165,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدراس رؤية الابتكار العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 13,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدارس رؤية الابتكار العالميه الاهلية الإبتدائية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 34,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأجيال المتطورة الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 948,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأجيال المتطورة المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 273,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأجيال المتطورة الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 261,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "أكاديمية ن الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 586,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "اكاديمية ن العالمية المتوسطة",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 76,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "ملحق ابتدائي بروضة باحة جدة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 45,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "باحة جدة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 116,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "بريق الاذهان لرياض الأطفال العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 71,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "بريق الاذهان العالمية(ملحق ابتدائي)",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 45,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "عالم التعلم العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 207,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة عالم التعليم الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 159,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "جدة الراقية الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 82,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدارس التعلم داخل المرح العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 126,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة جدة العالمية - المرحلة الإبتدائية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 147,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة جدة العالمية - المرحلة المتوسطة",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 186,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "مدرسة جدة العالمية - المرحلة الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 194,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروابي الخضراء الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 93,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروابي الخضراء المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 96,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الروابي الخضراء العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 121,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 535,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأندلس المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 318,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأجيال المتطورة الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 325,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الأجيال المتطورة المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 327,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الاجيال المتطورة الثانوية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 250,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "أكاديمية ن الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 76,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "أكاديمية ن العالمية المتوسطة",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 30,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الكون المطوره الابتدائية العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 90,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الكون المطوره المتوسطة العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 91,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي النهضة",
    "school": "الكون المطوره العالمية الثانوية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 68,
    "facility": "مركز صحي النهضة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الروضة الملحقة بالابتدائية 93",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 104,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الروضة العاشرة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 146,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الروضة الملحقة بالابتدائية105",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 44,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الروضة التاسعة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 125,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الروضة الخامسة و الخمسون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 67,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الروضة الملحقة بإبتدائية إسكان قوى الامن الداخلي 3",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 77,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "منارات الابداع رياض الأطفال الاهلية (فرع المروة)",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "رياض أطفال",
    "total": 35,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الابتدائية التسعون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 566,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الطفولة المبكرة بابتدائية الثالثة والتسعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 824,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الطفولة المبكرة بابتدائية الخامسة بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 607,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الطفولة المبكرة بابتدائية اسكان قوى الامن الداخلي الثالثة الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 278,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الابتدائية الاولى بعد المئتين",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 795,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "منارات الابداع الابتدائية ( فرع المروة)",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 222,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الامير احمد بن عبدالعزيز الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 230,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "سفيان الثوري الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 952,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "زيد بن خالد الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 733,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "سعد بن الربيع الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 606,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "المتوسطة الثانية و الثمانون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 188,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "المتوسطة السابعة و العشرون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 667,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "المتوسطة الحادية و الستون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 298,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "المتوسطة الثمانون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 593,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "المتوسطة الرابعة و الثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 173,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الواقدي المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 256,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الامير نايف بن عبدالعزيز المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 398,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الحارث بن كلدة المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 373,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الثانوية الخامسة والتسعون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 672,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الثانوية الرابعة والعشرون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 708,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "الثانوية العشرون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 381,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "سهيل بن عبدالله الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 869,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "مدينتي الصغيرة لرياض الأطفال العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 68,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي المروة",
    "school": "مدرسة مدينتي الصغيرة الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 206,
    "facility": "مركز صحي المروة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الروضة التاسعة والثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 59,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الروضة الملحقة بالابتدائية126",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 60,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "منابر الأمم الأهلية لرياض الأطفال",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 22,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "روضة الصرح",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 65,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الطفولة المبكرة بابتدائية الثانية والخمسون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 688,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الابتدائية التاسعة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 622,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "ابتدائية تحفيظ القران الثالثة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 513,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الطفولة المبكرة بابتدائية السادسة والعشرون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 660,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الطفولة المبكرة بالابتدائية التاسعة عشر بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 677,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الابتدائية الثالثة والخمسون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 384,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الابتدائية التاسعة والسبعون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 640,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الابتدائية الثامنة عشر بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 701,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "منابر الأمم الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 124,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "ابتدائية الصرح",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 302,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "شداد بن اوس الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 883,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "ابي هريرة الابتدائية",
    "gender": "بنين",
    "authority": "عالمي",
    "stage": "ابتدائي",
    "total": 593,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "المهاجرين الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 493,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الهداية الحديثة الابتدائية الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 191,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "اهلية البيان الابتدائية الاهلية بالصفا",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 73,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "متوسطة تحفيظ القرآن الثامنة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 262,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "المتوسطة الثانية و الخمسون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 479,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "المتوسطة التاسعة و الثلاثون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 517,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "متوسطة الصرح النموذجية للبنات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 101,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "منابر الأمم المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 67,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "ابي جندل المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 265,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الامام الذهبي المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 609,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "عدي بن حاتم المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 828,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الهداية الحديثة المتوسطة الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 51,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "أهلية البيان المتوسطة ( الربوة ) الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 49,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الثانوية الثانية والخمسون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 847,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الصرح النمودجية الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 208,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "حمزة بن عبدالمطلب الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 186,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "عمورية الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 954,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "أهلية البيان الثانوية الأهلية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 76,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "فرسان المعرفة العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 230,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "فرسان المعرفة الابتدائية العالميه",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 996,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "فرسان المعرفة الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 178,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "فرسان المعرفة المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 88,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الموارد الرائدة العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 40,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الموارد الرائدة الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 321,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الموارد الرائدة العالمية المتوسطة",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 28,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الاستبرق العالمية لرياض الأطفال",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "رياض أطفال",
    "total": 20,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "الاستبرق الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 98,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "فرسان المعرفة الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 192,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "فرسان المعرفة المتوسطة العالمية الأهلية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 255,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الربوة",
    "school": "فرسان المعرفة الثانوية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 109,
    "facility": "مركز صحي الربوة"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الروضة الملحقة بإبتدائية سيبويه",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 101,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الروضة الملحقة بالابتدائية 137",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "رياض أطفال",
    "total": 118,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "ابتدائية تحفيظ القران الرابعة عشر",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 400,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الطفولة المبكرة بابتدائية سيبويه",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 573,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الطفولة المبكرة بابتدائية السابعة والثلاثون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 584,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الابتدائية السابعة بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 818,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "معهد النور الابتدائي",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 44,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الامام حمزة الكوفي الابتدائية لتحفيظ القران الكريم",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 429,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "مزدلفة الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 732,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الامير سعود بن عبدالمحسن الابتدائية",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 517,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "متوسطة تحفيظ القرآن العاشرة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 140,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المتوسطة الخمسون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 508,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المتوسطة الثانية و الستون",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 243,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "معهد النور المتوسط",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 26,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "ذي النورين المتوسطة لتحفيظ القران الكريم",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 523,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المروة المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 969,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الاقصى المبارك المتوسطة",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "متوسط",
    "total": 588,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الثانوية الثامنة و السبعون - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 729,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "معهد النور الثانوي - مسارات",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 25,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "عثمان بن عفان الثانوية - مسارات",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ثانوي",
    "total": 1002,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الذكر الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 403,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "معرفة الخلود الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 282,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "ملحق ابتدائي بروضة أفاق الطفولة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 365,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارات جدة القسم العربي الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 684,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الأمجاد الأوليه الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 766,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الخلود المثالية الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 188,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "روضة جدة النموذجية الإبتدائية الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 403,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفيصلية الابتدائية الاهلية فرع الرحاب",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 247,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارة جدة الابتدائية الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ابتدائي",
    "total": 226,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الأمجاد الأوليه المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 243,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الذكر المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 136,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الخلود المثالية المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 38,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "روضة جدة النموذجية المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 167,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارات جدة القسم العربي المتوسطة الأهلية",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 234,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفيصلية المتوسطة الأهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 175,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارة جدة المتوسطة الاهلية",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "متوسط",
    "total": 253,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الذكر الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 162,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الأمجاد الأولية الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 584,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارات جدة الثانوية الأهلية - مسارات",
    "gender": "بنات",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 334,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفيصلية الثانوية الأهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 338,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "مدارس المنارات الثانويه الاهلية - مسارات",
    "gender": "بنين",
    "authority": "اهلي",
    "stage": "ثانوي",
    "total": 324,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الأمم الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 55,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الواحة الابتدائية العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 577,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المبدعون الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 272,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "هلا جدة الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 243,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفلاح الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 524,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفيصل الابتدائية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 134,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "مهد العلوم الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 260,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المقاصد الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 238,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المنارات الابتدائية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 845,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الكورنيش الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 69,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفلاح الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 30,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الواحة الابتدائية العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 202,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الامم الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 24,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المبدعون الإبتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 65,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارات جدة الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 285,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفيصل الابتدائية العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ابتدائي",
    "total": 134,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المقاصد المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 22,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "مدرسة المبدعون المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 49,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "مهد العلوم المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 44,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفلاح المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 119,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفيصل المتوسطة العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 50,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المنارات المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 223,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الواحة المتوسطة العالمية بنات",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 159,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الأمم المتوسطة العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 18,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفلاح المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 100,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "مهد العلوم المتوسطة العالميه",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 120,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الواحة المتوسطة العالمية بنين",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 164,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الكورنيش المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 130,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفيصل المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 78,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الامم المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 29,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "المبدعون العالميه المتوسطة",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 50,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارات جدة المتوسطة العالمية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "متوسط",
    "total": 258,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفلاح الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 100,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارات جدة الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 278,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الواحة الثانوية العالمية",
    "gender": "بنات",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 67,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الفلاح العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 50,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الواحة العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 80,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "الكورنيش العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 212,
    "facility": "مركز صحي الرحاب"
  },
  {
    "center": "مركز صحي البوادي 2",
    "school": "ابتدائيه عبدالرحمن بن بكر",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 390,
    "facility": "مركز صحي البوادي 2"
  },
  {
    "center": "مركز صحي الفيصلية",
    "school": "ابتدائية ابن الجرزي",
    "gender": "بنين",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 359,
    "facility": "مركز صحي الفيصلية"
  },
  {
    "center": "مركز صحي الصفا1",
    "school": "الابتدائية الثلاثون بعد المائة",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 834,
    "facility": "مركز صحي الصفا1"
  },
  {
    "center": "مركز صحي النعيم",
    "school": "الإبتدائية السابعة لتحفيظ القران",
    "gender": "بنات",
    "authority": "حكومي",
    "stage": "ابتدائي",
    "total": 400,
    "facility": "مركز صحي النعيم"
  },
  {
    "center": "مركز صحي الرحاب",
    "school": "منارات جدة العالمية الثانوية",
    "gender": "بنين",
    "authority": "عالمي اجنبي",
    "stage": "ثانوي",
    "total": 206,
    "facility": "مركز صحي الرحاب"
  }
];

// ---------- STATIC: رابغ (بياناتك الجديدة بالكامل) ----------
const RABIGH = "رابغ";
const RABIGH_SCHOOLS = [
  // ===== مركز صحي صعبر =====
  { center: "مركز صحي صعبر", school: "الطفولة المبكرة بابتدائية الاولى بصعبر", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 88 },
  { center: "مركز صحي صعبر", school: "مروان بن الحكم الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 30 },
  { center: "مركز صحي صعبر", school: "مروان بن الحكم المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 31 },
  { center: "مركز صحي صعبر", school: "المتوسطة الأولى بصعبر للبنات", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 35 },
  { center: "مركز صحي صعبر", school: "الروضة الملحقة بالابتدائية الأولى بصعبر", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 9 },

  // ===== مركز صحي كلية =====
  { center: "مركز صحي كلية", school: "الطفولة المبكرة بابتدائية ابي قحافة", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 151 },
  { center: "مركز صحي كلية", school: "ابتدئية كلية بنبن", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 66 },
  { center: "مركز صحي كلية", school: "ثانوية كلية مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 50 },
  { center: "مركز صحي كلية", school: "متوسطة كلية بنبن", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 151 },
  { center: "مركز صحي كلية", school: "الطفولة المبكرة بابتدائية الأولى بكلية", gender: "بنات", authority: "حكومي", stage: "رياض أطفال", total: 216 },

  // ===== مركز صحي حجر =====
  { center: "مركز صحي حجر", school: "المتوسطة الثانية و الأولى لتحفيظ القرآن بحجر -بنات-", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 167 },
  { center: "مركز صحي حجر", school: "المتوسطة و الثانوية الاولى بحجر -بنات-", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 140 },
  { center: "مركز صحي حجر", school: "الطفولة المبكرة بابتدائية المازنية", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 185 },
  { center: "مركز صحي حجر", school: "الثانوية الثانية بحجر -بنات-", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 167 },
  { center: "مركز صحي حجر", school: "الطفولة المبكرة بابتدائية الثانية بحجر", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 226 },
  { center: "مركز صحي حجر", school: "الطفولة المبكرة بابتدائية تحفيظ للقران بحجر", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 168 },
  { center: "مركز صحي حجر", school: "الطفولة المبكرة بابتدائية حذيفة بن اليمان", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 122 },
  { center: "مركز صحي حجر", school: "ابتدائية تحفيظ القران بحجر -بنين-", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 88 },
  { center: "مركز صحي حجر", school: "متوسطة حذيفة بن اليمان - بنين-", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 266 },
  { center: "مركز صحي حجر", school: "ثانوية حذيفة بن اليمان -بنين-", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 256 },

  // ===== المرجانية =====
  { center: "المرجانية", school: "أبواب التعليم الأهلية لرياض الأطفال برابغ", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 77 },
  { center: "المرجانية", school: "الروضة الاولى برابغ", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 245 },
  { center: "المرجانية", school: "الطفولة المبكرة بابتدائية الثالثة برابغ", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 480 },
  { center: "المرجانية", school: "الروضة الملحقة بابتدائية ابن الجوزي", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 142 },
  { center: "المرجانية", school: "الروضة الثانية برابغ", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 268 },
  { center: "المرجانية", school: "ابتدائية ابن الجوزي", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 251 },
  { center: "المرجانية", school: "الابتدائية الثالثة", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 480 },
  { center: "المرجانية", school: "الابتدائية الخامسة برابغ", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 486 },
  { center: "المرجانية", school: "صقر الجزيرة الابتدائية", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 299 },
  { center: "المرجانية", school: "المتوسطة الثالثة برابغ", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 477 },
  { center: "المرجانية", school: "متوسطة تحفيظ القرآن الأولى برابغ", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 119 },
  { center: "المرجانية", school: "اسعد بن زرارة المتوسطة", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 312 },
  { center: "المرجانية", school: "الثانوية الأولى برابغ - مسارات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 287 },
  { center: "المرجانية", school: "رابغ الثانوية", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 448 },
  { center: "المرجانية", school: "الابتدائية الثانية", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 235 },

  // ===== مستورة =====
  { center: "مستورة", school: "حمزة بن عبدالمطلب بنين", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 236 },
  { center: "مستورة", school: "متوسطة مستورة بنبن", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 173 },
  { center: "مستورة", school: "ثانوية مستورة بنبن", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 172 },
  { center: "مستورة", school: "ابتدائية تحفيظ القران", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 96 },
  { center: "مستورة", school: "متوسط مستورة بنات", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 174 },
  { center: "مستورة", school: "ثانوية مستورة بنات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 169 },

  // ===== الصليب الشرقي =====
  { center: "الصليب الشرقي", school: "ابتدئية الصفاء الشرقي", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 127 },
  { center: "الصليب الشرقي", school: "الثانوية الثانية برابغ", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 593 },
  { center: "الصليب الشرقي", school: "المتوسطة الثانية برابغ", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 449 },
  { center: "الصليب الشرقي", school: "متوسظة طارق بن زياد", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 431 },
  { center: "الصليب الشرقي", school: "تحفيظ القران المتوسطة", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 154 },
  { center: "الصليب الشرقي", school: "ابتدائية الصفا الشرقي", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 130 },
  { center: "الصليب الشرقي", school: "عبد الرحمن بن صخر", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 480 },
  { center: "الصليب الشرقي", school: "الابتدائية الثانية برابغ", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 487 },
  { center: "الصليب الشرقي", school: "البشر بن عاصم", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 118 },
  { center: "الصليب الشرقي", school: "تحفيظ القران الابتدائي", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 251 },
  { center: "الصليب الشرقي", school: "الابتدائية الاولى برابغ", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 454 },

  // ===== الجوبة =====
  { center: "الجوبة", school: "مدرسة الجوبة الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 119 },
  { center: "الجوبة", school: "مدرسة الجوبة الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 119 },

  // ===== كلية =====
  { center: "كلية", school: "الابتدائية الأولى بالحصينية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 88 },
  { center: "كلية", school: "متوسطة الأولى بكلية بنات", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 151 },
  { center: "كلية", school: "ثانوية الأولى بكلية مسارات بنات", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 144 },

  // ===== رابغ =====
  { center: "رابغ", school: "عمرو بن دينار المتوسطه بنين", gender: "بنين", authority: "حكومي", stage: "متوسط", total: 346 },
  { center: "رابغ", school: "ابي ذر الغفاري", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 708 },
  { center: "رابغ", school: "الروضة الملحقة بالابتدائية الصمد", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 35 },
  { center: "رابغ", school: "الرابعة الابتدائية", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 469 },
  { center: "رابغ", school: "مركز صناع الغد الاهلية", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 43 },
  { center: "رابغ", school: "االطفولة المبكرة بالصمد", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 80 },
  { center: "رابغ", school: "روضة براعم القران", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 85 },
  { center: "رابغ", school: "روضه اسوار المعرفة", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 83 },
  { center: "رابغ", school: "روضة براعم الجود", gender: "بنات", authority: "اهلي", stage: "رياض أطفال", total: 44 },
  { center: "رابغ", school: "ثانوية الفهد دمج فكري", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 661 },
  { center: "رابغ", school: "ثانوية الفهد مسارات", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 661 },
  { center: "رابغ", school: "ابتدائية ابي ذر دمج فكري", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 708 },
  { center: "رابغ", school: "مدرسة الحصان الاهلية ابتدائي بنات", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 438 },
  { center: "رابغ", school: "مدرسة الحصان الاهلية متوسط بنات", gender: "بنات", authority: "اهلي", stage: "متوسط", total: 188 },
  { center: "رابغ", school: "مدرسة الحصان ثانوي بنات", gender: "بنات", authority: "اهلي", stage: "ثانوي", total: 136 },
  { center: "رابغ", school: "مدرسة الحصان ابتدائي بنين", gender: "بنين", authority: "اهلي", stage: "ابتدائي", total: 300 },
  { center: "رابغ", school: "مرسة الحصان متوسط بنين", gender: "بنين", authority: "اهلي", stage: "متوسط", total: 196 },
  { center: "رابغ", school: "مدرسة الحصان ثانوي بنين", gender: "بنين", authority: "اهلي", stage: "ثانوي", total: 106 },
  { center: "رابغ", school: "مدرسة المتوسطة الأولى بنات", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 255 },

  // ===== المرخه =====
  { center: "المرخه", school: "كعب بن زهير الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 51 },

  // ===== الابواء =====
  { center: "الابواء", school: "الابتدائيه الثانيه", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 110 },
  { center: "الابواء", school: "الابتدائية الاولى", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 170 },
  { center: "الابواء", school: "روضة الابتدائىة الاولى", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 27 },
  { center: "الابواء", school: "شهاب الدين العسقلاني الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 61 },
  { center: "الابواء", school: "هشام بن عبدالملك الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 34 },
  { center: "الابواء", school: "الابواء الثانوية", gender: "بنين", authority: "حكومي", stage: "ثانوي", total: 81 },
  { center: "الابواء", school: "المتوسطه الاولي بنات", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 98 },

  // ===== مركز صحي مغينية =====
  { center: "مركز صحي مغينية", school: "الابتداية الاولى بمغينية", gender: "بنات", authority: "حكومي", stage: "ابتدائي", total: 70 },
  { center: "مركز صحي مغينية", school: "المتوسطة الاولى بمغينية", gender: "بنات", authority: "حكومي", stage: "متوسط", total: 18 },
  { center: "مركز صحي مغينية", school: "الثانوية الاولى بمغينية", gender: "بنات", authority: "حكومي", stage: "ثانوي", total: 19 },
  { center: "مركز صحي مغينية", school: "ابتدائية ومتوسطة المامون بتماية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 60 },

  // ===== مركز صحي النويبع =====
  { center: "مركز صحي النويبع", school: "مدرسة النويبع الابتدائية", gender: "بنين", authority: "حكومي", stage: "ابتدائي", total: 68 },
];


// ---------- BASE MAPS ----------
export function buildMeta() {
  // مفاتيح المنشآت
  const centersByFacility = {
    "رابغ": [
      "الابواء", "الجوبة", "الصليب الشرقي", "المرجانية", "المرخه", "رابغ", "كلية",
      "مركز صحي النويبع", "مركز صحي حجر", "مركز صحي صعبر", "مركز صحي كلية",
      "مركز صحي مغينية", "مستورة"
    ],
    [KFIS]: [
      "مركز صحي البوادي 1", "مركز صحي البوادي 2", "مركز صحي الربوة", "مركز صحي السلامة",
      "مركز صحي الصفا 1", "مركز صحي الصفا 2", "مركز صحي الفيصلية", "مركز صحي المروة",
      "مركز صحي النعيم", "مركز صحي النهضة", "مركز صحي الرحاب", "مركز صحي مشرفة"
    ],
    [KAMC]: [
      "مركز صحي أبحر الشمالية", "مركز صحي الريان", "مركز صحي الشاطى", "مركز صحي الشراع",
      "مركز صحي الصالحية", "مركز صحي الصواري", "مركز صحي الفردوس", "مركز صحي الماجد",
      "مركز صحي الوفاء", "مركز صحي بريمان", "مركز صحي ثول", "مركز صحي خالد النموذجي",
      "مركز صحي ذهبان"
    ]
  };

  // لن نضع بذور يدوية؛ سيتم الاشتقاق من القوائم الثابتة
  const schoolsByCenter = {};

  // ---------- Build derived maps ----------
  const schoolStatic = Object.create(null);

  const FACILITY_LISTS = [
    { facility: RABIGH, list: RABIGH_SCHOOLS },
    { facility: KFIS, list: KFIS_SCHOOLS },
    { facility: KAMC, list: KAMC_SCHOOLS },
  ];

  for (const { facility, list } of FACILITY_LISTS) {
    for (const s of list) {
      const key = `${facility}::${s.center}`;
      if (!schoolsByCenter[key]) schoolsByCenter[key] = [];
      if (!schoolsByCenter[key].includes(s.school)) {
        schoolsByCenter[key].push(s.school);
      }
      const skey = `${facility}::${s.center}::${s.school}`;
      schoolStatic[skey] = {
        gender: s.gender || "",
        authority: s.authority || "",
        stage: (s.stage || "").trim(),
        total: Number(s.total) || 0,
      };
    }
  }

  // ترتيب اختياري
  Object.keys(schoolsByCenter).forEach((k) => {
    schoolsByCenter[k].sort((a, b) => a.localeCompare(b, "ar"));
  });

  return { centersByFacility, schoolsByCenter, schoolStatic };
}

// Helper
export function getSchoolStatic(facility, center, school) {
  const meta = META;
  const skey = `${facility}::${center}::${school}`;
  const rec = (meta && meta.schoolStatic && meta.schoolStatic[skey]) || null;
  return rec
    ? { gender: rec.gender, authority: rec.authority, stage: rec.stage, total: rec.total }
    : { gender: "", authority: "", stage: "", total: 0 };
}

export const META = buildMeta();
export const FACILITIES = Object.keys(META.centersByFacility);
