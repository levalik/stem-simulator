import { Scenario } from './types';

export const HEBREW_MOCK_SCENARIOS: Scenario[] = [
    {
        id: "scenario_001",
        title: "אתגר התייעלות אנרגטית",
        category: "פיזיקה / מדעי הסביבה",
        duration: "20 דקות",
        opening: {
            description: "מועצת העיר החליטה על יעד של הפחתת צריכת האנרגיה העירונית ב-20% כדי לעמוד ביעדי הקיימות החדשים.",
            imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "כמהנדס העיר הראשי, עליך לזהות את המקור העיקרי לבזבוז אנרגיה ולהציע פתרון המאזן בין עלות, יעילות ותמיכה ציבורית.",
            context: "קיצוצים בתקציב מרחפים מעל, והתושבים אינם מרוצים מהפסקות החשמל האחרונות."
        },
        data: {
            chartType: 'bar',
            description: "צריכת אנרגיה שנתית לפי מגזר (ב-GWh).",
            chartData: [
                { name: "מגורים", value: 450 },
                { name: "תעשייה", value: 800 },
                { name: "מסחר", value: 300 },
                { name: "תחבורה", value: 600 }
            ],
            facts: [
                "המגזר התעשייתי אחראי ל-40% מסך הפליטות בעיר.",
                "צריכת החשמל הביתית עולה ב-10% מדי שנה.",
                "עלות ייצור קוט\"ש בתחנת כוח פחמית זולה ב-30% מאנרגיה ירוקה כרגע."
            ]
        },
        analysis: {
            questions: [
                "בהתבסס על הנתונים, איזה מגזר תורם הכי הרבה לצריכת האנרגיה?",
                "אילו דפוסים אתה מזהה בנוגע ליחס בין השימוש התעשייתי לשימוש הביתי?"
            ],
            keyTerms: ["תעשייה", "גבוה ביותר", "כפול", "משמעותי"]
        },
        solutions: {
            options: [
                { id: "sol_1", text: "הטלת מגבלות נוקשות על צריכת אנרגיה בתעשייה באופן מיידי.", correct: false, resultId: "backlash" },
                { id: "sol_2", text: "תמריצים למעבר לתאורת LED באזורי מגורים ומסחר.", correct: true, resultId: "sustainable" },
                { id: "sol_3", text: "בניית תחנת כוח פחמית חדשה כדי לענות על הביקוש.", correct: false, resultId: "pollution" }
            ]
        },
        simulation: {
            results: {
                "backlash": {
                    summary: "קיפאון כלכלי",
                    detail: "מפעלים איימו לעזוב את העיר עקב הרגולציה הנוקשה, מה שגרם לאובדן מקומות עבודה.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1535132012373-3085fb089e3d?auto=format&fit=crop&w=800&q=80"
                },
                "sustainable": {
                    summary: "הפחתה הדרגתית",
                    detail: "צריכת האנרגיה ירדה ב-15% בשנה הראשונה עם תמיכה ציבורית גבוהה.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80"
                },
                "pollution": {
                    summary: "משבר סביבתי",
                    detail: "אספקת האנרגיה ענתה על הביקוש, אך מדד איכות האוויר החמיר משמעותית.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1611273426761-53c8577a20fa?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["כיצד הנתונים השפיעו על ההחלטה שלך?", "מה היית עושה אחרת בהינתן התוצאה?"]
        }
    },
    {
        id: "scenario_002",
        title: "חיסכון במים עירוניים",
        category: "אקולוגיה / תכנון עירוני",
        duration: "15 דקות",
        opening: {
            description: "בצורת ממושכת מאיימת על מפלס מאגרי המים של העיר, שירד ל-40% מהקיבולת.",
            imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לבחור אסטרטגיה מיידית להפחתת השימוש במים מבלי לגרום לפאניקה ציבורית או לבעיות תברואה.",
            context: "המגזר החקלאי דורש עדיפות, אך השימוש הביתי עולה בקיץ."
        },
        data: {
            chartType: 'pie',
            description: "התפלגות שימוש במים לפי מגזר",
            chartData: [
                { name: "חקלאות", value: 65 },
                { name: "מגורים", value: 20 },
                { name: "תעשייה", value: 10 },
                { name: "פארקים ציבוריים", value: 5 }
            ],
            facts: [
                "החקלאות צורכת 65% מהמים אך תורמת רק 2% לתמ\"ג העירוני.",
                "צריכת המים הביתית מגיעה לשיא בין השעות 18:00-21:00.",
                "קצב האידוי במאגרים גבוה ב-15% מהממוצע הרב-שנתי."
            ]
        },
        analysis: {
            questions: [
                "איזה מגזר משתמש ברוב משאבי המים?",
                "האם התמקדות בשימוש הביתי מספיקה כדי לפתור את המשבר?"
            ],
            keyTerms: ["חקלאות", "רוב", "לא מספיק", "השקיה"]
        },
        solutions: {
            options: [
                { id: "s2_1", text: "קיצוץ אספקת המים למגורים ב-50% באופן מיידי.", correct: false, resultId: "panic" },
                { id: "s2_2", text: "יישום סובסידיות להשקיה בטפטוף לחקלאים.", correct: true, resultId: "efficiency" },
                { id: "s2_3", text: "ייבוא מים ממדינות שכנות בעלות גבוהה.", correct: false, resultId: "debt" }
            ]
        },
        simulation: {
            results: {
                "panic": {
                    summary: "מהומות ציבוריות",
                    detail: "התושבים התמרדו עקב הקיצוצים הדרסטיים בעוד החוות המשיכו להשתמש במים בחופשיות.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1555862124-a4ebf4c16482?auto=format&fit=crop&w=800&q=80"
                },
                "efficiency": {
                    summary: "יציבות לטווח ארוך",
                    detail: "שימוש המים בחקלאות ירד ב-30%, מה שייצב את המאגר.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1622383563227-0440114a8517?auto=format&fit=crop&w=800&q=80"
                },
                "debt": {
                    summary: "משבר פיננסי",
                    detail: "המים הובטחו, אך העיר פשטה רגל.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["מדוע הנתונים היו חשובים בבחירת המגזר הנכון?", "כיצד משתווים פתרונות לטווח קצר לעומת טווח ארוך?"]
        }
    },
    {
        id: "scenario_003",
        title: "שלמות מבנית של גשר",
        category: "הנדסה / פיזיקה",
        duration: "25 דקות",
        opening: {
            description: "גשר תלוי ישן מראה סימני שחיקה. התנועה גדלה ב-200% מאז שנבנה.",
            imageUrl: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "קבע אם הגשר זקוק לתיקון, חיזוק או החלפה בהתבסס על נתוני מבחן מאמץ.",
            context: "החלפה היא יקרה ותגרום לפקקי תנועה למשך שנתיים."
        },
        data: {
            chartType: 'line',
            description: "אמפליטודת רעידות הגשר מול עומס תנועה",
            chartData: [
                { name: "10 טון", value: 2 },
                { name: "20 טון", value: 4 },
                { name: "30 טון", value: 12 },
                { name: "40 טון", value: 45 }
            ],
            facts: [
                "רעידות בעוצמה של מעל 10 מ״מ נחשבות למסוכנות למבנה.",
                "הגשר תוכנן במקור לעומס של 15 טון בלבד.",
                "עלות החלפת הגשר מוערכת ב-50 מיליון ש״ח."
            ]
        },
        analysis: {
            questions: [
                "באיזה עומס הרעידות הופכות לבלתי יציבות?",
                "האם הקשר בין העומס לרעידות הוא ליניארי?"
            ],
            keyTerms: ["אקספוננציאלי", "30 טון", "לא יציב", "לא ליניארי"]
        },
        solutions: {
            options: [
                { id: "s3_1", text: "לסגור את הגשר ולבנות מחדש מיד.", correct: false, resultId: "traffic_chaos" },
                { id: "s3_2", text: "להגביל משאיות כבדות (>20 טון) ולחזק.", correct: true, resultId: "safe_extend" },
                { id: "s3_3", text: "לא לעשות כלום, זה נראה בסדר.", correct: false, resultId: "collapse" }
            ]
        },
        simulation: {
            results: {
                "traffic_chaos": {
                    summary: "סיוט תחבורתי",
                    detail: "העיר בפקק מוחלט. הגשר היה בטוח, אך המחיר היה גבוה מדי.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&w=800&q=80"
                },
                "safe_extend": {
                    summary: "בטיחות אופטימלית",
                    detail: "חיי הגשר הוארכו ב-10 שנים עם הפרעה מינימלית.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?auto=format&fit=crop&w=800&q=80"
                },
                "collapse": {
                    summary: "כשל קטסטרופלי",
                    detail: "הגשר קרס בשעת העומס.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1594718360228-45c857632596?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["כיצד הנתונים הלא-ליניאריים שינו את הערכת הסיכונים שלך?"]
        }
    },
    {
        id: "scenario_004",
        title: "אופטימיזציה של מערך ההסעות",
        category: "מתמטיקה / חקר ביצועים",
        duration: "30 דקות",
        opening: {
            description: "תלמידים והורים מתלוננים על צפיפות בלתי נסבלת בקווי האוטובוס לבית הספר בשעות הבוקר.",
            imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לתכנן מחדש את לוח הזמנים של האוטובוסים כדי להפחית את הצפיפות, מבלי לחרוג מתקציב ההסעות הקבוע.",
            context: "הוספת אוטובוסים נוספים היא יקרה מאוד, אך שינוי זמנים אפשרי."
        },
        data: {
            chartType: 'bar',
            description: "מספר נוסעים ממוצע לפי שעה (07:00-09:00)",
            chartData: [
                { name: "07:00", value: 20 },
                { name: "07:15", value: 35 },
                { name: "07:30", value: 85 },
                { name: "07:45", value: 90 },
                { name: "08:00", value: 40 },
                { name: "08:15", value: 15 }
            ],
            facts: [
                "קיבולת מקסימלית של אוטובוס היא 50 תלמידים.",
                "עלות שעת נהג נוספת היא 200 ש״ח.",
                "80% מהתלמידים גרים במרחק של פחות מ-5 ק״מ מבית הספר."
            ]
        },
        analysis: {
            questions: [
                "באילו שעות נרשם העומס המשמעותי ביותר?",
                "האם פיזור אחיד של אוטובוסים הוא הפתרון היעיל ביותר?"
            ],
            keyTerms: ["שיא", "התפלגות נורמלית", "07:30", "07:45"]
        },
        solutions: {
            options: [
                { id: "s4_1", text: "הוספת 2 אוטובוסים נוספים בכל שעה.", correct: false, resultId: "budget_deficit" },
                { id: "s4_2", text: "תגבור קווים בין 07:30 ל-07:45 על חשבון שעות אחרות.", correct: true, resultId: "optimized" },
                { id: "s4_3", text: "הקדמת שעת התחלת הלימודים ל-07:00.", correct: false, resultId: "parent_anger" }
            ]
        },
        simulation: {
            results: {
                "budget_deficit": {
                    summary: "חריגה תקציבית",
                    detail: "הבעיה נפתרה, אך בית הספר נכנס לגירעון ונאלץ לקצץ בשעות הוראה.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                },
                "optimized": {
                    summary: "יעילות מרבית",
                    detail: "הצפיפות ירדה ב-40% ללא עלות נוספת. התלמידים מגיעים בזמן ובנוחות.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
                },
                "parent_anger": {
                    summary: "התנגדות הורים",
                    detail: "ההורים סירבו לשינוי שעת ההתחלה, והאוטובוסים נותרו ריקים ב-07:00.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["כיצד ניתוח ההתפלגות עזר בפתרון הבעיה?", "מה ההבדל בין פתרון 'יקר' לפתרון 'חכם'?"]
        }
    },
    {
        id: "scenario_005",
        title: "התפרצות חיידק עמיד",
        category: "ביולוגיה / רפואה",
        duration: "25 דקות",
        opening: {
            description: "במחלקה הפנימית בבית החולים זוהתה התפרצות של זיהום חיידקי שאינו מגיב לטיפול האנטיביוטי הסטנדרטי.",
            imageUrl: "https://images.unsplash.com/photo-1584036561566-b93a9016b1d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך להחליט על פרוטוקול טיפול חדש כדי לעצור את ההתפרצות ולמנוע תמותה, תוך מזעור הסיכון ליצירת עמידות נוספת.",
            context: "החיידק מראה עמידות לפניצילין, אך רגיש חלקית לאנטיביוטיקה חזקה ויקרה יותר."
        },
        data: {
            chartType: 'line',
            description: "קצב גידול מושבות חיידקים כתלות בריכוז האנטיביוטיקה (מיקרוגרם/מ״ל)",
            chartData: [
                { name: "0", value: 100 },
                { name: "2", value: 95 },
                { name: "4", value: 80 },
                { name: "8", value: 40 },
                { name: "16", value: 5 },
                { name: "32", value: 0 }
            ],
            facts: [
                "חיידקים מכפילים את מספרם כל 20 דקות בתנאים אידיאליים.",
                "שימוש לא נכון באנטיביוטיקה הוא הגורם הראשי לעמידות.",
                "עלות יום אשפוז בטיפול נמרץ היא כ-10,000 ש״ח."
            ]
        },
        analysis: {
            questions: [
                "מהו הריכוז המינימלי הנדרש כדי לעצור כמעט לחלוטין את גידול החיידק?",
                "מדוע ריכוז נמוך מדי עלול להיות מסוכן יותר מאשר אי-טיפול כלל?"
            ],
            keyTerms: ["סף עמידות", "ברירה טבעית", "16", "32"]
        },
        solutions: {
            options: [
                { id: "s5_1", text: "המשך טיפול באנטיביוטיקה רגילה במינון כפול.", correct: false, resultId: "resistance" },
                { id: "s5_2", text: "מעבר מיידי לאנטיביוטיקה חזקה במינון גבוה (32 מק״ג).", correct: true, resultId: "eradication" },
                { id: "s5_3", text: "הפסקת כל טיפול אנטיביוטי כדי לתת לגוף להתמודד.", correct: false, resultId: "sepsis" }
            ]
        },
        simulation: {
            results: {
                "resistance": {
                    summary: "החמרת העמידות",
                    detail: "החיידקים פיתחו עמידות גם למינון הגבוה, והזיהום התפשט למחלקות נוספות.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80"
                },
                "eradication": {
                    summary: "מיגור ההתפרצות",
                    detail: "הזיהום נעצר תוך 48 שעות. לא נרשמו מקרי הדבקה נוספים.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80"
                },
                "sepsis": {
                    summary: "קריסת מערכות",
                    detail: "ללא טיפול, מצב החולים הידרדר במהירות.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["מהו הקשר בין מינון חלקי לבין אבולוציה של חיידקים?", "כיצד נתונים כמותיים מצילים חיים ברפואה?"]
        }
    },
    {
        id: "scenario_006",
        title: "בטיחות בדרכים - מרחק עצירה",
        category: "פיזיקה / קינמטיקה",
        duration: "20 דקות",
        opening: {
            description: "בצומת עירוני ראשי מתרחשות תאונות רבות בימי גשם, למרות שהנהגים נוסעים במהירות המותרת (50 קמ״ש).",
            imageUrl: "https://images.unsplash.com/photo-1495554605298-8d74386b4cf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לקבוע את מהירות הנסיעה הבטוחה החדשה לימי גשם, בהתבסס על הפיזיקה של מרחקי עצירה.",
            context: "כביש רטוב מקטין את החיכוך ומגדיל את מרחק הבלימה משמעותית."
        },
        data: {
            chartType: 'line',
            description: "מרחק עצירה כולל (תגובה + בלימה) כתלות במהירות (בכביש רטוב)",
            chartData: [
                { name: "30 קמ״ש", value: 15 },
                { name: "40 קמ״ש", value: 26 },
                { name: "50 קמ״ש", value: 45 },
                { name: "60 קמ״ש", value: 70 }
            ],
            facts: [
                "מרחק העצירה גדל ביחס ריבועי למהירות.",
                "מקדם החיכוך בכביש רטוב נמוך ב-40% מכביש יבש.",
                "זמן התגובה הממוצע של נהג הוא 1.5 שניות."
            ]
        },
        analysis: {
            questions: [
                "כיצד משתנה מרחק העצירה כאשר המהירות גדלה מ-30 ל-60 קמ״ש?",
                "האם הקשר בין המהירות למרחק העצירה הוא ליניארי?"
            ],
            keyTerms: ["ריבועי", "לא ליניארי", "פי 4", "חיכוך"]
        },
        solutions: {
            options: [
                { id: "s6_1", text: "הורדת המהירות המותרת ל-40 קמ״ש.", correct: true, resultId: "safe_stop" },
                { id: "s6_2", text: "השארת המהירות על 50 קמ״ש אך הצבת תמרור אזהרה.", correct: false, resultId: "accidents_continue" },
                { id: "s6_3", text: "הורדת המהירות ל-20 קמ״ש.", correct: false, resultId: "traffic_jam" }
            ]
        },
        simulation: {
            results: {
                "safe_stop": {
                    summary: "איזון בטיחותי",
                    detail: "מספר התאונות ירד ב-80% וזרימת התנועה נשמרה סבירה.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
                },
                "accidents_continue": {
                    summary: "ללא שינוי",
                    detail: "נהגים התעלמו מהתמרור והתאונות המשיכו להתרחש.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?auto=format&fit=crop&w=800&q=80"
                },
                "traffic_jam": {
                    summary: "עומס תנועה כבד",
                    detail: "התאונות פסקו, אך נוצרו פקקים אדירים ששיתקו את האזור.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["מדוע שינוי קטן במהירות משפיע משמעותית על מרחק העצירה?", "כיצד ידע בפיזיקה יכול להשפיע על חוקי תנועה?"]
        }
    },
    {
        id: "scenario_007",
        title: "זיהום בנהר הקישון",
        category: "כימיה / איכות סביבה",
        duration: "30 דקות",
        opening: {
            description: "דגים רבים נמצאו מתים בנהר הקישון. בדיקות מעבדה גילו חומציות גבוהה (pH נמוך) במים.",
            imageUrl: "https://images.unsplash.com/photo-1617410036528-f99085605430?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לזהות את מקור הזיהום ולבחור בשיטת הטיפול הכימית המתאימה ביותר לנטרול החומציות והצלת המערכת האקולוגית.",
            context: "מפעל סמוך דיווח על דליפה של חומצה גופרתית."
        },
        data: {
            chartType: 'line',
            description: "רמת החומציות (pH) במרחקים שונים מהמפעל (0 = שפך המפעל)",
            chartData: [
                { name: "0מ'", value: 2.0 },
                { name: "100מ'", value: 3.5 },
                { name: "500מ'", value: 5.5 },
                { name: "1000מ'", value: 6.8 }
            ],
            facts: [
                "סולם ה-pH הוא לוגריתמי: כל יחידה מייצגת שינוי פי 10 בחומציות.",
                "דגים אינם יכולים לשרוד ב-pH נמוך מ-5 לאורך זמן.",
                "סיד (Calcium Hydroxide) הוא בסיס זול ויעיל לנטרול חומצות."
            ]
        },
        analysis: {
            questions: [
                "מהי רמת ה-pH בקרבת המפעל ומה משמעותה?",
                "כיצד משתנה החומציות ככל שמתרחקים מהמקור?"
            ],
            keyTerms: ["חומצי", "מהילה", "לוגריתמי", "נטרול"]
        },
        solutions: {
            options: [
                { id: "s7_1", text: "הזרמת כמות גדולה של מים למהילה (דילול).", correct: false, resultId: "partial_fix" },
                { id: "s7_2", text: "הוספת בסיס (סיד) לנטרול החומצה.", correct: true, resultId: "neutralized" },
                { id: "s7_3", text: "המתנה שהטבע יעשה את שלו.", correct: false, resultId: "ecological_death" }
            ]
        },
        simulation: {
            results: {
                "partial_fix": {
                    summary: "שיפור זמני",
                    detail: "החומציות ירדה מעט, אך לא מספיק כדי להציל את הדגים באזור הקרוב.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=800&q=80"
                },
                "neutralized": {
                    summary: "שיקום מוצלח",
                    detail: "הוספת הבסיס העלתה את ה-pH ל-7 (ניטרלי) והמערכת האקולוגית ניצלה.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                },
                "ecological_death": {
                    summary: "אסון אקולוגי",
                    detail: "כל הדגים ברדיוס של 1 ק״מ מתו. הנזק בלתי הפיך לשנים הקרובות.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1535083793061-5adb313ece4c?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["מה ההבדל בין מהילה לנטרול כימי?", "מדוע חשוב להבין את סולם ה-pH בטיפול בשפכים?"]
        }
    },
    {
        id: "scenario_008",
        title: "אופטימיזציה של תמחור פיצה",
        category: "מתמטיקה / כלכלה",
        duration: "25 דקות",
        opening: {
            description: "פיצרייה שכונתית חדשה רוצה למקסם את הרווח היומי שלה, אך מתלבטת לגבי המחיר הנכון למגש.",
            imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לקבוע את מחיר הפיצה האופטימלי (בין 40, 60, או 80 ש״ח) כדי להשיג את הרווח המקסימלי.",
            context: "מחיר נמוך מביא הרבה לקוחות אך רווח נמוך ליחידה. מחיר גבוה מבריח לקוחות."
        },
        data: {
            chartType: 'bar',
            description: "תחזית מכירות יומית לפי מחיר למגש",
            chartData: [
                { name: "40 ש״ח", value: 100 },
                { name: "60 ש״ח", value: 60 },
                { name: "80 ש״ח", value: 20 }
            ],
            facts: [
                "עלות הכנת פיצה אחת (חומרים + עבודה) היא 20 ש״ח.",
                "הוצאות קבועות (שכירות, חשמל) הן 500 ש״ח ליום.",
                "רווח יומי = (מחיר - עלות משתנה) * כמות - הוצאות קבועות."
            ]
        },
        analysis: {
            questions: [
                "מהו הרווח הצפוי במחיר של 40 ש״ח? ((40-20)*100 - 500)",
                "באיזה מחיר הרווח הכולל הוא הגבוה ביותר?"
            ],
            keyTerms: ["רווח", "פדיון", "עלות משתנה", "נקודת איזון"]
        },
        solutions: {
            options: [
                { id: "s8_1", text: "קביעת מחיר נמוך (40 ש״ח) כדי למשוך מקסימום לקוחות.", correct: false, resultId: "low_margin" },
                { id: "s8_2", text: "קביעת מחיר בינוני (60 ש״ח) לאיזון בין כמות לרווח.", correct: true, resultId: "optimal" },
                { id: "s8_3", text: "קביעת מחיר גבוה (80 ש״ח) למיתוג יוקרתי.", correct: false, resultId: "low_sales" }
            ]
        },
        simulation: {
            results: {
                "low_margin": {
                    summary: "עבודה קשה, רווח נמוך",
                    detail: "מכרתם 100 פיצות! אבל הרווח היה רק 1,500 ש״ח. המטבח קרס תחת העומס.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80"
                },
                "optimal": {
                    summary: "רווח מקסימלי",
                    detail: "מכרתם 60 פיצות. הרווח היומי הוא 1,900 ש״ח. העסק משגשג!",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?auto=format&fit=crop&w=800&q=80"
                },
                "low_sales": {
                    summary: "לקוחות מאוכזבים",
                    detail: "מכרתם רק 20 פיצות. הרווח הוא 700 ש״ח בלבד. הלקוחות הלכו למתחרים.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["מדוע מקסימום מכירות לא תמיד מוביל למקסימום רווח?", "כיצד משפיעות הוצאות קבועות על ההחלטה?"]
        }
    },
    {
        id: "scenario_009",
        title: "ניהול תקציב כיתתי",
        category: "ניהול / חינוך פיננסי",
        duration: "20 דקות",
        opening: {
            description: "קיבלת תקציב שנתי של 5,000 ש״ח לכיתה שלך. עליך להחליט כיצד לחלק אותו בין צרכים שונים.",
            imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לבחור את אסטרטגיית ההוצאה הטובה ביותר שתמקסם את הלמידה והגיבוש החברתי, מבלי לחרוג מהתקציב.",
            context: "התלמידים רוצים טיול יקר, אך חסר ציוד לימודי בסיסי."
        },
        data: {
            chartType: 'pie',
            description: "התפלגות עלויות משוערת",
            chartData: [
                { name: "טיול שנתי", value: 3000 },
                { name: "ציוד לימודי", value: 1500 },
                { name: "פעילויות גיבוש", value: 1000 },
                { name: "קישוט כיתה", value: 500 }
            ],
            facts: [
                "התקציב הכולל הוא 5,000 ש״ח.",
                "טיול שנתי הוא חובה, אך ניתן להוזיל אותו.",
                "מחסור בציוד לימודי פוגע בציונים."
            ]
        },
        analysis: {
            questions: [
                "האם התקציב מספיק לכל הרצונות?",
                "על מה היית מוותר כדי לאפשר את הטיול?"
            ],
            keyTerms: ["תקציב", "תיעדוף", "ויתור", "עלות אלטרנטיבית"]
        },
        solutions: {
            options: [
                { id: "s9_1", text: "הוצאת רוב התקציב על הטיול וצמצום בציוד.", correct: false, resultId: "fun_but_failing" },
                { id: "s9_2", text: "חלוקה מאוזנת: טיול זול יותר ורכישת ציוד חיוני.", correct: true, resultId: "balanced" },
                { id: "s9_3", text: "ביטול הטיול והשקעה מלאה בציוד וטכנולוגיה.", correct: false, resultId: "boring" }
            ]
        },
        simulation: {
            results: {
                "fun_but_failing": {
                    summary: "כיף אך לא יעיל",
                    detail: "התלמידים נהנו בטיול, אך התקשו ללמוד ללא ציוד מתאים.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                },
                "balanced": {
                    summary: "איזון מושלם",
                    detail: "הכיתה מגובשת וההישגים הלימודיים השתפרו בזכות הציוד החדש.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1427504746696-ea5abd7dfe03?auto=format&fit=crop&w=800&q=80"
                },
                "boring": {
                    summary: "מרמור כיתתי",
                    detail: "הציונים עלו, אך האווירה בכיתה עכורה והתלמידים כועסים.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["מה למדת על ניהול תקציב מוגבל?", "כיצד איזנת בין צרכים לימודיים לחברתיים?"]
        }
    },
    {
        id: "scenario_010",
        title: "שילוב טכנולוגיה בכיתה",
        category: "טכנולוגיה בחינוך",
        duration: "15 דקות",
        opening: {
            description: "בית הספר קיבל תרומה לרכישת טכנולוגיה חדשה לכיתה אחת.",
            imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לבחור את הטכנולוגיה שתביא את הערך המוסף הגבוה ביותר ללמידה.",
            context: "המורים חלוקים בדעותיהם בין טאבלטים, לוח חכם או מדפסת תלת-ממד."
        },
        data: {
            chartType: 'bar',
            description: "השפעה משוערת על מעורבות תלמידים (סולם 1-10)",
            chartData: [
                { name: "טאבלטים אישיים", value: 9 },
                { name: "לוח חכם", value: 7 },
                { name: "מדפסת תלת-ממד", value: 8 }
            ],
            facts: [
                "טאבלטים דורשים תחזוקה שוטפת וחיבור אינטרנט יציב.",
                "לוח חכם משמש בעיקר את המורה להוראה פרונטלית.",
                "מדפסת תלת-ממד מעודדת יצירתיות אך דורשת ידע טכני."
            ]
        },
        analysis: {
            questions: [
                "איזו טכנולוגיה מעודדת למידה פעילה ביותר?",
                "מהם האתגרים ביישום כל אחת מהאפשרויות?"
            ],
            keyTerms: ["למידה פעילה", "תחזוקה", "מעורבות", "יישום"]
        },
        solutions: {
            options: [
                { id: "s10_1", text: "רכישת טאבלטים אישיים לכל תלמיד.", correct: true, resultId: "engagement" },
                { id: "s10_2", text: "התקנת לוח חכם מתקדם.", correct: false, resultId: "passive" },
                { id: "s10_3", text: "רכישת מדפסת תלת-ממד.", correct: false, resultId: "niche" }
            ]
        },
        simulation: {
            results: {
                "engagement": {
                    summary: "למידה מותאמת אישית",
                    detail: "התלמידים גילו עניין רב והתקדמו בקצב אישי. המורה עבר לתפקיד מנחה.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                },
                "passive": {
                    summary: "שיפור קל",
                    detail: "השיעורים הפכו ויזואליים יותר, אך שיטת ההוראה נותרה פרונטלית.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                },
                "niche": {
                    summary: "שימוש מוגבל",
                    detail: "רק קבוצה קטנה של תלמידים השתמשה במדפסת. רוב הכיתה לא הרוויחה.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["כיצד הטכנולוגיה משנה את תפקיד המורה?", "האם הכלי היקר ביותר הוא תמיד הטוב ביותר?"]
        }
    },
    {
        id: "scenario_011",
        title: "אופטימיזציה של אנרגיה סולארית",
        category: "פיזיקה / אנרגיה מתחדשת",
        duration: "20 דקות",
        opening: {
            description: "בית הספר החליט להתקין פאנלים סולאריים על הגג כדי לחסוך בחשמל ולתרום לסביבה.",
            imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "עליך לקבוע את הזווית האופטימלית להצבת הפאנלים כדי להפיק את המקסימום אנרגיה שנתית.",
            context: "זווית שטוחה טובה לקיץ, זווית תלולה טובה לחורף. התקציב מוגבל למערכת קבועה."
        },
        data: {
            chartType: 'line',
            description: "תפוקת אנרגיה חודשית (קוט\"ש) לפי זווית התקנה",
            chartData: [
                { name: "ינואר", value: 300 },
                { name: "אפריל", value: 550 },
                { name: "יולי", value: 700 },
                { name: "אוקטובר", value: 450 }
            ],
            facts: [
                "ישראל נמצאת בקו רוחב 32 צפון.",
                "הזווית האופטימלית השנתית היא בדרך כלל קו הרוחב.",
                "אבק מצטבר יותר על פאנלים שטוחים ומפחית יעילות."
            ]
        },
        analysis: {
            questions: [
                "כיצד משפיעה עונת השנה על תפוקת האנרגיה?",
                "מדוע זווית ההתקנה חשובה כל כך?"
            ],
            keyTerms: ["זווית פגיעה", "קרינה", "יעילות", "עונתיות"]
        },
        solutions: {
            options: [
                { id: "s11_1", text: "התקנה שטוחה (0 מעלות) לחיסכון בעלויות.", correct: false, resultId: "dusty" },
                { id: "s11_2", text: "התקנה בזווית 30 מעלות דרומה.", correct: true, resultId: "optimal_solar" },
                { id: "s11_3", text: "התקנה בזווית 60 מעלות למיקסום חורף.", correct: false, resultId: "summer_loss" }
            ]
        },
        simulation: {
            results: {
                "dusty": {
                    summary: "בעיות תחזוקה",
                    detail: "התפוקה הייתה טובה בקיץ, אך בחורף הצטבר בוץ והיעילות צנחה.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf2f24f?auto=format&fit=crop&w=800&q=80"
                },
                "optimal_solar": {
                    summary: "יעילות מקסימלית",
                    detail: "המערכת הפיקה את המקסימום האפשרי לאורך השנה והחזירה את ההשקעה מהר.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                },
                "summer_loss": {
                    summary: "הפסד בקיץ",
                    detail: "התפוקה בחורף הייתה מצוינת, אך הפסדנו את שעות השמש הארוכות של הקיץ.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["מה הקשר בין קו הרוחב לזווית הפאנל?", "כיצד שיקולי תחזוקה משפיעים על התכנון ההנדסי?"]
        }
    },
    {
        id: "scenario_012",
        title: "חשבון - חיבור בסיסי",
        category: "מתמטיקה / חשבון",
        duration: "10 דקות",
        opening: {
            description: "תרגול חיבור בסיסי באמצעות פירות.",
            imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "ליוסי יש 5 תפוחים. דנה נתנה לו עוד 3 תפוחים. כמה תפוחים יש ליוסי כעת?",
            context: "חיבור פשוט של מספרים חד-ספרתיים."
        },
        data: {
            chartType: 'bar',
            description: "מספר התפוחים",
            chartData: [
                { name: "יוסי (התחלה)", value: 5 },
                { name: "דנה נתנה", value: 3 }
            ],
            facts: [
                "חיבור היא פעולה של הוספת כמות אחת לאחרת.",
                "הסימן לחיבור הוא +."
            ]
        },
        analysis: {
            questions: [
                "כמה תפוחים היו ליוסי בהתחלה?",
                "כמה תפוחים הוא קיבל?"
            ],
            keyTerms: ["חיבור", "סכום", "פלוס"]
        },
        solutions: {
            options: [
                { id: "s12_1", text: "7 תפוחים", correct: false, resultId: "wrong_sum" },
                { id: "s12_2", text: "8 תפוחים", correct: true, resultId: "correct_sum" },
                { id: "s12_3", text: "9 תפוחים", correct: false, resultId: "wrong_sum" }
            ]
        },
        simulation: {
            results: {
                "wrong_sum": {
                    summary: "תשובה שגויה",
                    detail: "נסה לספור שוב את התפוחים ביחד.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80"
                },
                "correct_sum": {
                    summary: "כל הכבוד!",
                    detail: "5 ועוד 3 הם אכן 8.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1576158187530-986388606206?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["איך הגעת לתשובה?", "האם אפשר לחבר דברים אחרים באותה דרך?"]
        }
    },
    {
        id: "scenario_013",
        title: "חשבון - חיסור בסיסי",
        category: "מתמטיקה / חשבון",
        duration: "10 דקות",
        opening: {
            description: "תרגול חיסור בסיסי באמצעות ממתקים.",
            imageUrl: "https://images.unsplash.com/photo-1582058928232-216836896e00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "לדני היו 10 סוכריות. הוא אכל 4 סוכריות. כמה סוכריות נשארו לדני?",
            context: "חיסור פשוט של מספרים."
        },
        data: {
            chartType: 'bar',
            description: "מספר הסוכריות",
            chartData: [
                { name: "סוכריות (התחלה)", value: 10 },
                { name: "נאכלו", value: 4 }
            ],
            facts: [
                "חיסור היא פעולה של הפחתת כמות אחת מאחרת.",
                "הסימן לחיסור הוא -."
            ]
        },
        analysis: {
            questions: [
                "כמה סוכריות היו בהתחלה?",
                "כמה ירדו?"
            ],
            keyTerms: ["חיסור", "הפרש", "מינוס"]
        },
        solutions: {
            options: [
                { id: "s13_1", text: "5 סוכריות", correct: false, resultId: "wrong_diff" },
                { id: "s13_2", text: "6 סוכריות", correct: true, resultId: "correct_diff" },
                { id: "s13_3", text: "7 סוכריות", correct: false, resultId: "wrong_diff" }
            ]
        },
        simulation: {
            results: {
                "wrong_diff": {
                    summary: "תשובה שגויה",
                    detail: "נסה לחשב שוב כמה נשאר.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80"
                },
                "correct_diff": {
                    summary: "מצוין!",
                    detail: "10 פחות 4 הם אכן 6.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1576158187530-986388606206?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["האם נשארו יותר או פחות סוכריות ממה שהיו בהתחלה?", "למה זה קרה?"]
        }
    }
];

export const ENGLISH_MOCK_SCENARIOS: Scenario[] = [
    {
        id: "scenario_001",
        title: "Energy Efficiency Challenge",
        category: "Physics / Environmental Science",
        duration: "20 mins",
        opening: {
            description: "The city council has decided on a goal of reducing urban energy consumption by 20% to meet new sustainability goals.",
            imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "As the chief city engineer, you must identify the main source of energy waste and propose a solution that balances cost, efficiency, and public support.",
            context: "Budget cuts are looming, and residents are unhappy with recent power outages."
        },
        data: {
            chartType: 'bar',
            description: "Annual energy consumption by sector (in GWh).",
            chartData: [
                { name: "Residential", value: 450 },
                { name: "Industrial", value: 800 },
                { name: "Commercial", value: 300 },
                { name: "Transport", value: 600 }
            ],
            facts: [
                "The industrial sector accounts for 40% of total city emissions.",
                "Household electricity consumption rises by 10% annually.",
                "Cost of producing a kWh at a coal plant is currently 30% cheaper than green energy."
            ]
        },
        analysis: {
            questions: [
                "Based on the data, which sector contributes the most to energy consumption?",
                "What patterns do you identify regarding the ratio between industrial and residential use?"
            ],
            keyTerms: ["Industrial", "Highest", "Double", "Significant"]
        },
        solutions: {
            options: [
                { id: "sol_1", text: "Impose strict limits on industrial energy consumption immediately.", correct: false, resultId: "backlash" },
                { id: "sol_2", text: "Incentives for switching to LED lighting in residential and commercial areas.", correct: true, resultId: "sustainable" },
                { id: "sol_3", text: "Build a new coal power plant to meet demand.", correct: false, resultId: "pollution" }
            ]
        },
        simulation: {
            results: {
                "backlash": {
                    summary: "Economic Stagnation",
                    detail: "Factories threatened to leave the city due to strict regulations, causing job losses.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1535132012373-3085fb089e3d?auto=format&fit=crop&w=800&q=80"
                },
                "sustainable": {
                    summary: "Gradual Reduction",
                    detail: "Energy consumption dropped by 15% in the first year with high public support.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80"
                },
                "pollution": {
                    summary: "Environmental Crisis",
                    detail: "Energy supply met demand, but the air quality index worsened significantly.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1611273426761-53c8577a20fa?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["How did the data influence your decision?", "What would you do differently given the outcome?"]
        }
    },
    {
        id: "scenario_002",
        title: "Urban Water Conservation",
        category: "Ecology / Urban Planning",
        duration: "15 mins",
        opening: {
            description: "A prolonged drought threatens the city's water reservoir levels, which have dropped to 40% of capacity.",
            imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must choose an immediate strategy to reduce water usage without causing public panic or sanitation issues.",
            context: "The agricultural sector demands priority, but domestic use rises in summer."
        },
        data: {
            chartType: 'pie',
            description: "Water usage distribution by sector",
            chartData: [
                { name: "Agriculture", value: 65 },
                { name: "Residential", value: 20 },
                { name: "Industrial", value: 10 },
                { name: "Public Parks", value: 5 }
            ],
            facts: [
                "Agriculture consumes 65% of water but contributes only 2% to city GDP.",
                "Domestic water consumption peaks between 18:00-21:00.",
                "Reservoir evaporation rate is 15% higher than the multi-year average."
            ]
        },
        analysis: {
            questions: [
                "Which sector uses the majority of water resources?",
                "Is focusing on residential use sufficient to solve the crisis?"
            ],
            keyTerms: ["Agriculture", "Majority", "Insufficient", "Irrigation"]
        },
        solutions: {
            options: [
                { id: "s2_1", text: "Cut residential water supply by 50% immediately.", correct: false, resultId: "panic" },
                { id: "s2_2", text: "Implement subsidies for drip irrigation for farmers.", correct: true, resultId: "efficiency" },
                { id: "s2_3", text: "Import water from neighboring countries at high cost.", correct: false, resultId: "debt" }
            ]
        },
        simulation: {
            results: {
                "panic": {
                    summary: "Public Riots",
                    detail: "Residents revolted due to drastic cuts while farms continued to use water freely.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1555862124-a4ebf4c16482?auto=format&fit=crop&w=800&q=80"
                },
                "efficiency": {
                    summary: "Long-term Stability",
                    detail: "Agricultural water use dropped by 30%, stabilizing the reservoir.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1622383563227-0440114a8517?auto=format&fit=crop&w=800&q=80"
                },
                "debt": {
                    summary: "Financial Crisis",
                    detail: "Water was secured, but the city went bankrupt.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["Why was the data important in choosing the right sector?", "How do short-term vs long-term solutions compare?"]
        }
    },
    {
        id: "scenario_003",
        title: "Bridge Structural Integrity",
        category: "Engineering / Physics",
        duration: "25 mins",
        opening: {
            description: "An old suspension bridge is showing signs of wear. Traffic has increased by 200% since it was built.",
            imageUrl: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "Determine if the bridge needs repair, reinforcement, or replacement based on stress test data.",
            context: "Replacement is expensive and will cause traffic jams for two years."
        },
        data: {
            chartType: 'line',
            description: "Bridge vibration amplitude vs. Traffic load",
            chartData: [
                { name: "10 tons", value: 2 },
                { name: "20 tons", value: 4 },
                { name: "30 tons", value: 12 },
                { name: "40 tons", value: 45 }
            ],
            facts: [
                "Vibrations over 10mm are considered dangerous to the structure.",
                "The bridge was originally designed for a load of only 15 tons.",
                "Estimated cost of bridge replacement is 50 million NIS."
            ]
        },
        analysis: {
            questions: [
                "At what load do vibrations become unstable?",
                "Is the relationship between load and vibration linear?"
            ],
            keyTerms: ["Exponential", "30 tons", "Unstable", "Non-linear"]
        },
        solutions: {
            options: [
                { id: "s3_1", text: "Close the bridge and rebuild immediately.", correct: false, resultId: "traffic_chaos" },
                { id: "s3_2", text: "Restrict heavy trucks (>20 tons) and reinforce.", correct: true, resultId: "safe_extend" },
                { id: "s3_3", text: "Do nothing, it looks fine.", correct: false, resultId: "collapse" }
            ]
        },
        simulation: {
            results: {
                "traffic_chaos": {
                    summary: "Traffic Nightmare",
                    detail: "The city is gridlocked. The bridge was safe, but the cost was too high.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&w=800&q=80"
                },
                "safe_extend": {
                    summary: "Optimal Safety",
                    detail: "Bridge life extended by 10 years with minimal disruption.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?auto=format&fit=crop&w=800&q=80"
                },
                "collapse": {
                    summary: "Catastrophic Failure",
                    detail: "The bridge collapsed during rush hour.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1594718360228-45c857632596?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["How did the non-linear data change your risk assessment?"]
        }
    },
    {
        id: "scenario_004",
        title: "Bus Schedule Optimization",
        category: "Mathematics / Operations Research",
        duration: "30 mins",
        opening: {
            description: "Students and parents are complaining about unbearable overcrowding on school bus lines in the morning.",
            imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must redesign the bus schedule to reduce overcrowding without exceeding the fixed transport budget.",
            context: "Adding more buses is very expensive, but changing times is possible."
        },
        data: {
            chartType: 'bar',
            description: "Average number of passengers by hour (07:00-09:00)",
            chartData: [
                { name: "07:00", value: 20 },
                { name: "07:15", value: 35 },
                { name: "07:30", value: 85 },
                { name: "07:45", value: 90 },
                { name: "08:00", value: 40 },
                { name: "08:15", value: 15 }
            ],
            facts: [
                "Maximum bus capacity is 50 students.",
                "Cost of an additional driver hour is 200 NIS.",
                "80% of students live less than 5 km from school."
            ]
        },
        analysis: {
            questions: [
                "At what times is the most significant congestion recorded?",
                "Is an even distribution of buses the most efficient solution?"
            ],
            keyTerms: ["Peak", "Normal distribution", "07:30", "07:45"]
        },
        solutions: {
            options: [
                { id: "s4_1", text: "Add 2 extra buses every hour.", correct: false, resultId: "budget_deficit" },
                { id: "s4_2", text: "Reinforce lines between 07:30 and 07:45 at the expense of other times.", correct: true, resultId: "optimized" },
                { id: "s4_3", text: "Move school start time to 07:00.", correct: false, resultId: "parent_anger" }
            ]
        },
        simulation: {
            results: {
                "budget_deficit": {
                    summary: "Budget Overrun",
                    detail: "The problem was solved, but the school went into deficit and had to cut teaching hours.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                },
                "optimized": {
                    summary: "Maximum Efficiency",
                    detail: "Crowding dropped by 40% at no extra cost. Students arrive on time and comfortably.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
                },
                "parent_anger": {
                    summary: "Parental Resistance",
                    detail: "Parents refused the start time change, and buses remained empty at 07:00.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["How did analyzing the distribution help solve the problem?", "What is the difference between an 'expensive' solution and a 'smart' solution?"]
        }
    },
    {
        id: "scenario_005",
        title: "Resistant Bacteria Outbreak",
        category: "Biology / Medicine",
        duration: "25 mins",
        opening: {
            description: "An outbreak of a bacterial infection that does not respond to standard antibiotic treatment has been identified in the internal medicine ward.",
            imageUrl: "https://images.unsplash.com/photo-1584036561566-b93a9016b1d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must decide on a new treatment protocol to stop the outbreak and prevent mortality, while minimizing the risk of creating further resistance.",
            context: "The bacteria shows resistance to penicillin but is partially sensitive to a stronger and more expensive antibiotic."
        },
        data: {
            chartType: 'line',
            description: "Bacterial colony growth rate vs. Antibiotic concentration (µg/mL)",
            chartData: [
                { name: "0", value: 100 },
                { name: "2", value: 95 },
                { name: "4", value: 80 },
                { name: "8", value: 40 },
                { name: "16", value: 5 },
                { name: "32", value: 0 }
            ],
            facts: [
                "Bacteria double in number every 20 minutes under ideal conditions.",
                "Misuse of antibiotics is the primary cause of resistance.",
                "Cost of a day in ICU is approximately 10,000 NIS."
            ]
        },
        analysis: {
            questions: [
                "What is the minimum concentration required to almost completely stop bacterial growth?",
                "Why might too low a concentration be more dangerous than no treatment at all?"
            ],
            keyTerms: ["Resistance threshold", "Natural selection", "16", "32"]
        },
        solutions: {
            options: [
                { id: "s5_1", text: "Continue treatment with standard antibiotics at double dose.", correct: false, resultId: "resistance" },
                { id: "s5_2", text: "Immediate switch to high-dose strong antibiotics (32 µg).", correct: true, resultId: "eradication" },
                { id: "s5_3", text: "Stop all antibiotic treatment to let the body cope.", correct: false, resultId: "sepsis" }
            ]
        },
        simulation: {
            results: {
                "resistance": {
                    summary: "Worsening Resistance",
                    detail: "Bacteria developed resistance even to the high dose, and the infection spread to other wards.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1584036561566-b93a9499cb6d?auto=format&fit=crop&w=800&q=80"
                },
                "eradication": {
                    summary: "Outbreak Eradicated",
                    detail: "The infection stopped within 48 hours. No further cases were recorded.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80"
                },
                "sepsis": {
                    summary: "System Failure",
                    detail: "Without treatment, patients' conditions deteriorated rapidly.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1516574187841-693017951ac9?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["What is the relationship between partial dosage and bacterial evolution?", "How does quantitative data save lives in medicine?"]
        }
    },
    {
        id: "scenario_006",
        title: "Road Safety - Stopping Distance",
        category: "Physics / Kinematics",
        duration: "20 mins",
        opening: {
            description: "Many accidents occur at a main city intersection on rainy days, even though drivers are driving at the speed limit (50 km/h).",
            imageUrl: "https://images.unsplash.com/photo-1495554605298-8d74386b4cf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must determine the new safe driving speed for rainy days, based on the physics of stopping distances.",
            context: "Wet roads reduce friction and significantly increase braking distance."
        },
        data: {
            chartType: 'line',
            description: "Total stopping distance (reaction + braking) vs. Speed (on wet road)",
            chartData: [
                { name: "30 km/h", value: 15 },
                { name: "40 km/h", value: 26 },
                { name: "50 km/h", value: 45 },
                { name: "60 km/h", value: 70 }
            ],
            facts: [
                "Stopping distance increases quadratically with speed.",
                "Friction coefficient on wet roads is 40% lower than on dry roads.",
                "Average driver reaction time is 1.5 seconds."
            ]
        },
        analysis: {
            questions: [
                "How does stopping distance change when speed increases from 30 to 60 km/h?",
                "Is the relationship between speed and stopping distance linear?"
            ],
            keyTerms: ["Quadratic", "Non-linear", "4 times", "Friction"]
        },
        solutions: {
            options: [
                { id: "s6_1", text: "Lower the speed limit to 40 km/h.", correct: true, resultId: "safe_stop" },
                { id: "s6_2", text: "Keep speed at 50 km/h but place a warning sign.", correct: false, resultId: "accidents_continue" },
                { id: "s6_3", text: "Lower speed to 20 km/h.", correct: false, resultId: "traffic_jam" }
            ]
        },
        simulation: {
            results: {
                "safe_stop": {
                    summary: "Safety Balance",
                    detail: "Accidents dropped by 80% and traffic flow remained reasonable.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=800&q=80"
                },
                "accidents_continue": {
                    summary: "No Change",
                    detail: "Drivers ignored the sign and accidents continued to occur.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
                },
                "traffic_jam": {
                    summary: "Heavy Traffic",
                    detail: "Accidents stopped, but massive traffic jams paralyzed the area.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["Why does a small change in speed significantly affect stopping distance?", "How can physics knowledge influence traffic laws?"]
        }
    },
    {
        id: "scenario_007",
        title: "Kishon River Pollution",
        category: "Chemistry / Environmental Quality",
        duration: "30 mins",
        opening: {
            description: "Many dead fish were found in the Kishon River. Lab tests revealed high acidity (low pH) in the water.",
            imageUrl: "https://images.unsplash.com/photo-1617410036528-f99085605430?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must identify the source of pollution and choose the most appropriate chemical treatment method to neutralize acidity and save the ecosystem.",
            context: "A nearby factory reported a sulfuric acid leak."
        },
        data: {
            chartType: 'line',
            description: "Acidity level (pH) at different distances from the factory (0 = factory outlet)",
            chartData: [
                { name: "0m", value: 2.0 },
                { name: "100m", value: 3.5 },
                { name: "500m", value: 5.5 },
                { name: "1000m", value: 6.8 }
            ],
            facts: [
                "The pH scale is logarithmic: each unit represents a 10-fold change in acidity.",
                "Fish cannot survive in pH lower than 5 for long periods.",
                "Lime (Calcium Hydroxide) is a cheap and effective base for neutralizing acids."
            ]
        },
        analysis: {
            questions: [
                "What is the pH level near the factory and what does it mean?",
                "How does acidity change as you move away from the source?"
            ],
            keyTerms: ["Acidic", "Dilution", "Logarithmic", "Neutralization"]
        },
        solutions: {
            options: [
                { id: "s7_1", text: "Pour a large amount of water for dilution.", correct: false, resultId: "partial_fix" },
                { id: "s7_2", text: "Add a base (lime) to neutralize the acid.", correct: true, resultId: "neutralized" },
                { id: "s7_3", text: "Wait for nature to take its course.", correct: false, resultId: "ecological_death" }
            ]
        },
        simulation: {
            results: {
                "partial_fix": {
                    summary: "Temporary Improvement",
                    detail: "Acidity dropped slightly, but not enough to save fish in the immediate area.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1583325958573-3c89e40551ad?auto=format&fit=crop&w=800&q=80"
                },
                "neutralized": {
                    summary: "Successful Restoration",
                    detail: "Adding the base raised the pH to 7 (neutral) and the ecosystem was saved.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1467197663608-c5a279ce6c15?auto=format&fit=crop&w=800&q=80"
                },
                "ecological_death": {
                    summary: "Ecological Disaster",
                    detail: "All fish within a 1 km radius died. The damage is irreversible for years.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1569060367013-2e93a3af3a59?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["What is the difference between dilution and chemical neutralization?", "Why is it important to understand the pH scale in wastewater treatment?"]
        }
    },
    {
        id: "scenario_008",
        title: "Pizza Pricing Optimization",
        category: "Mathematics / Economics",
        duration: "25 mins",
        opening: {
            description: "A new neighborhood pizza place wants to maximize its daily profit but is unsure about the right price per tray.",
            imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must determine the optimal pizza price (between 40, 60, or 80 NIS) to achieve maximum profit.",
            context: "A low price brings many customers but low profit per unit. A high price drives customers away."
        },
        data: {
            chartType: 'bar',
            description: "Daily sales forecast by price per tray",
            chartData: [
                { name: "40 NIS", value: 100 },
                { name: "60 NIS", value: 60 },
                { name: "80 NIS", value: 20 }
            ],
            facts: [
                "Cost to make one pizza (ingredients + labor) is 20 NIS.",
                "Fixed costs (rent, electricity) are 500 NIS per day.",
                "Daily Profit = (Price - Variable Cost) * Quantity - Fixed Costs."
            ]
        },
        analysis: {
            questions: [
                "What is the expected profit at 40 NIS? ((40-20)*100 - 500)",
                "At what price is the total profit highest?"
            ],
            keyTerms: ["Profit", "Revenue", "Variable Cost", "Break-even"]
        },
        solutions: {
            options: [
                { id: "s8_1", text: "Set a low price (40 NIS) to attract maximum customers.", correct: false, resultId: "low_margin" },
                { id: "s8_2", text: "Set a medium price (60 NIS) to balance volume and margin.", correct: true, resultId: "optimal" },
                { id: "s8_3", text: "Set a high price (80 NIS) for premium branding.", correct: false, resultId: "low_sales" }
            ]
        },
        simulation: {
            results: {
                "low_margin": {
                    summary: "Hard Work, Low Profit",
                    detail: "You sold 100 pizzas! But profit was only 1,500 NIS. The kitchen collapsed under the load.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80"
                },
                "optimal": {
                    summary: "Maximum Profit",
                    detail: "You sold 60 pizzas. Daily profit is 1,900 NIS. The business is thriving!",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?auto=format&fit=crop&w=800&q=80"
                },
                "low_sales": {
                    summary: "Disappointed Customers",
                    detail: "You sold only 20 pizzas. Profit is just 700 NIS. Customers went to competitors.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["Why does maximum sales not always lead to maximum profit?", "How do fixed costs affect the decision?"]
        }
    },
    {
        id: "scenario_009",
        title: "Classroom Budget Management",
        category: "Management / Financial Literacy",
        duration: "20 mins",
        opening: {
            description: "You received an annual budget of 5,000 NIS for your class. You must decide how to allocate it between different needs.",
            imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must choose the best spending strategy to maximize learning and social cohesion, without exceeding the budget.",
            context: "Students want an expensive trip, but basic study supplies are missing."
        },
        data: {
            chartType: 'pie',
            description: "Estimated cost distribution",
            chartData: [
                { name: "Annual Trip", value: 3000 },
                { name: "Study Supplies", value: 1500 },
                { name: "Social Activities", value: 1000 },
                { name: "Class Decoration", value: 500 }
            ],
            facts: [
                "Total budget is 5,000 NIS.",
                "Annual trip is mandatory, but can be made cheaper.",
                "Lack of study supplies affects grades."
            ]
        },
        analysis: {
            questions: [
                "Is the budget sufficient for all wants?",
                "What would you give up to allow for the trip?"
            ],
            keyTerms: ["Budget", "Prioritization", "Trade-off", "Opportunity Cost"]
        },
        solutions: {
            options: [
                { id: "s9_1", text: "Spend most of the budget on the trip and cut back on supplies.", correct: false, resultId: "fun_but_failing" },
                { id: "s9_2", text: "Balanced split: Cheaper trip and buying essential supplies.", correct: true, resultId: "balanced" },
                { id: "s9_3", text: "Cancel the trip and invest fully in supplies and technology.", correct: false, resultId: "boring" }
            ]
        },
        simulation: {
            results: {
                "fun_but_failing": {
                    summary: "Fun but Inefficient",
                    detail: "Students enjoyed the trip, but struggled to learn without proper equipment.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                },
                "balanced": {
                    summary: "Perfect Balance",
                    detail: "The class is cohesive and academic achievements improved thanks to new equipment.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1427504746696-ea5abd7dfe03?auto=format&fit=crop&w=800&q=80"
                },
                "boring": {
                    summary: "Class Resentment",
                    detail: "Grades went up, but the atmosphere in class is gloomy and students are angry.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["What did you learn about managing a limited budget?", "How did you balance academic vs social needs?"]
        }
    },
    {
        id: "scenario_010",
        title: "Integrating Technology in Class",
        category: "EdTech",
        duration: "15 mins",
        opening: {
            description: "The school received a donation to purchase new technology for one classroom.",
            imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must choose the technology that will bring the highest added value to learning.",
            context: "Teachers are divided between tablets, a smart board, or a 3D printer."
        },
        data: {
            chartType: 'bar',
            description: "Estimated impact on student engagement (1-10 scale)",
            chartData: [
                { name: "Personal Tablets", value: 9 },
                { name: "Smart Board", value: 7 },
                { name: "3D Printer", value: 8 }
            ],
            facts: [
                "Tablets require ongoing maintenance and stable internet.",
                "Smart board is mainly used by the teacher for frontal teaching.",
                "3D printer encourages creativity but requires technical knowledge."
            ]
        },
        analysis: {
            questions: [
                "Which technology encourages active learning the most?",
                "What are the challenges in implementing each option?"
            ],
            keyTerms: ["Active Learning", "Maintenance", "Engagement", "Implementation"]
        },
        solutions: {
            options: [
                { id: "s10_1", text: "Purchase personal tablets for every student.", correct: true, resultId: "engagement" },
                { id: "s10_2", text: "Install an advanced smart board.", correct: false, resultId: "passive" },
                { id: "s10_3", text: "Purchase a 3D printer.", correct: false, resultId: "niche" }
            ]
        },
        simulation: {
            results: {
                "engagement": {
                    summary: "Personalized Learning",
                    detail: "Students showed great interest and progressed at their own pace. The teacher moved to a facilitator role.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                },
                "passive": {
                    summary: "Slight Improvement",
                    detail: "Lessons became more visual, but the teaching method remained frontal.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                },
                "niche": {
                    summary: "Limited Use",
                    detail: "Only a small group of students used the printer. The majority of the class did not benefit.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["How does technology change the teacher's role?", "Is the most expensive tool always the best?"]
        }
    },
    {
        id: "scenario_011",
        title: "Solar Energy Optimization",
        category: "Physics / Renewable Energy",
        duration: "20 mins",
        opening: {
            description: "The school has decided to install solar panels on the roof to save electricity and contribute to the environment.",
            imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "You must determine the optimal angle for placing the panels to maximize annual energy production.",
            context: "A flat angle is good for summer, a steep angle is good for winter. Budget is limited to a fixed system."
        },
        data: {
            chartType: 'line',
            description: "Monthly energy production (kWh) by installation angle",
            chartData: [
                { name: "Jan", value: 300 },
                { name: "Apr", value: 550 },
                { name: "Jul", value: 700 },
                { name: "Oct", value: 450 }
            ],
            facts: [
                "The location is at latitude 32 North.",
                "The optimal annual angle is usually equal to the latitude.",
                "Dust accumulates more on flat panels, reducing efficiency."
            ]
        },
        analysis: {
            questions: [
                "How does the season affect energy production?",
                "Why is the installation angle so important?"
            ],
            keyTerms: ["Incidence Angle", "Radiation", "Efficiency", "Seasonality"]
        },
        solutions: {
            options: [
                { id: "s11_1", text: "Flat installation (0 degrees) to save costs.", correct: false, resultId: "dusty" },
                { id: "s11_2", text: "Installation at 30 degrees facing south.", correct: true, resultId: "optimal_solar" },
                { id: "s11_3", text: "Installation at 60 degrees to maximize winter output.", correct: false, resultId: "summer_loss" }
            ]
        },
        simulation: {
            results: {
                "dusty": {
                    summary: "Maintenance Issues",
                    detail: "Output was good in summer, but mud accumulated in winter and efficiency dropped.",
                    outcomeType: "neutral",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf2f24f?auto=format&fit=crop&w=800&q=80"
                },
                "optimal_solar": {
                    summary: "Maximum Efficiency",
                    detail: "The system produced the maximum possible throughout the year and returned the investment quickly.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                },
                "summer_loss": {
                    summary: "Summer Loss",
                    detail: "Winter output was excellent, but we lost the long sun hours of summer.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["What is the relationship between latitude and panel angle?", "How do maintenance considerations affect engineering design?"]
        }
    },
    {
        id: "scenario_012",
        title: "Arithmetic - Basic Addition",
        category: "Mathematics / Arithmetic",
        duration: "10 mins",
        opening: {
            description: "Practice basic addition using apples.",
            imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "Yossi has 5 apples. Dana gave him 3 more apples. How many apples does Yossi have now?",
            context: "Simple addition of single-digit numbers."
        },
        data: {
            chartType: 'bar',
            description: "Number of Apples",
            chartData: [
                { name: "Yossi (Start)", value: 5 },
                { name: "Dana gave", value: 3 }
            ],
            facts: [
                "Addition is the action of adding one quantity to another.",
                "The sign for addition is +."
            ]
        },
        analysis: {
            questions: [
                "How many apples did Yossi have initially?",
                "How many did he receive?"
            ],
            keyTerms: ["Addition", "Sum", "Plus"]
        },
        solutions: {
            options: [
                { id: "s12_1", text: "7 apples", correct: false, resultId: "wrong_sum" },
                { id: "s12_2", text: "8 apples", correct: true, resultId: "correct_sum" },
                { id: "s12_3", text: "9 apples", correct: false, resultId: "wrong_sum" }
            ]
        },
        simulation: {
            results: {
                "wrong_sum": {
                    summary: "Incorrect Answer",
                    detail: "Try counting the apples together again.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80"
                },
                "correct_sum": {
                    summary: "Well Done!",
                    detail: "5 plus 3 is indeed 8.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1576158187530-986388606206?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["How did you reach the answer?", "Can you add other things in the same way?"]
        }
    },
    {
        id: "scenario_013",
        title: "Arithmetic - Basic Subtraction",
        category: "Mathematics / Arithmetic",
        duration: "10 mins",
        opening: {
            description: "Practice basic subtraction using candies.",
            imageUrl: "https://images.unsplash.com/photo-1582058928232-216836896e00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        problem: {
            text: "Danny had 10 candies. He ate 4 candies. How many candies does Danny have left?",
            context: "Simple subtraction of numbers."
        },
        data: {
            chartType: 'bar',
            description: "Number of Candies",
            chartData: [
                { name: "Candies (Start)", value: 10 },
                { name: "Eaten", value: 4 }
            ],
            facts: [
                "Subtraction is the action of taking one quantity away from another.",
                "The sign for subtraction is -."
            ]
        },
        analysis: {
            questions: [
                "How many candies were there initially?",
                "How many were eaten?"
            ],
            keyTerms: ["Subtraction", "Difference", "Minus"]
        },
        solutions: {
            options: [
                { id: "s13_1", text: "5 candies", correct: false, resultId: "wrong_diff" },
                { id: "s13_2", text: "6 candies", correct: true, resultId: "correct_diff" },
                { id: "s13_3", text: "7 candies", correct: false, resultId: "wrong_diff" }
            ]
        },
        simulation: {
            results: {
                "wrong_diff": {
                    summary: "Incorrect Answer",
                    detail: "Try calculating how many are left again.",
                    outcomeType: "failure",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80"
                },
                "correct_diff": {
                    summary: "Excellent!",
                    detail: "10 minus 4 is indeed 6.",
                    outcomeType: "success",
                    outcomeImageUrl: "https://images.unsplash.com/photo-1576158187530-986388606206?auto=format&fit=crop&w=800&q=80"
                }
            }
        },
        reflection: {
            questions: ["Are there more or fewer candies left than at the start?", "Why did this happen?"]
        }
    }
];

