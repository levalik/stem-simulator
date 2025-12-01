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
                "backlash": { summary: "קיפאון כלכלי", detail: "מפעלים איימו לעזוב את העיר עקב הרגולציה הנוקשה, מה שגרם לאובדן מקומות עבודה.", outcomeType: "failure" },
                "sustainable": { summary: "הפחתה הדרגתית", detail: "צריכת האנרגיה ירדה ב-15% בשנה הראשונה עם תמיכה ציבורית גבוהה.", outcomeType: "success" },
                "pollution": { summary: "משבר סביבתי", detail: "אספקת האנרגיה ענתה על הביקוש, אך מדד איכות האוויר החמיר משמעותית.", outcomeType: "failure" }
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
                "panic": { summary: "מהומות ציבוריות", detail: "התושבים התמרדו עקב הקיצוצים הדרסטיים בעוד החוות המשיכו להשתמש במים בחופשיות.", outcomeType: "failure" },
                "efficiency": { summary: "יציבות לטווח ארוך", detail: "שימוש המים בחקלאות ירד ב-30%, מה שייצב את המאגר.", outcomeType: "success" },
                "debt": { summary: "משבר פיננסי", detail: "המים הובטחו, אך העיר פשטה רגל.", outcomeType: "failure" }
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
                "traffic_chaos": { summary: "סיוט תחבורתי", detail: "העיר בפקק מוחלט. הגשר היה בטוח, אך המחיר היה גבוה מדי.", outcomeType: "neutral" },
                "safe_extend": { summary: "בטיחות אופטימלית", detail: "חיי הגשר הוארכו ב-10 שנים עם הפרעה מינימלית.", outcomeType: "success" },
                "collapse": { summary: "כשל קטסטרופלי", detail: "הגשר קרס בשעת העומס.", outcomeType: "failure" }
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
                "budget_deficit": { summary: "חריגה תקציבית", detail: "הבעיה נפתרה, אך בית הספר נכנס לגירעון ונאלץ לקצץ בשעות הוראה.", outcomeType: "failure" },
                "optimized": { summary: "יעילות מרבית", detail: "הצפיפות ירדה ב-40% ללא עלות נוספת. התלמידים מגיעים בזמן ובנוחות.", outcomeType: "success" },
                "parent_anger": { summary: "התנגדות הורים", detail: "ההורים סירבו לשינוי שעת ההתחלה, והאוטובוסים נותרו ריקים ב-07:00.", outcomeType: "failure" }
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
                "resistance": { summary: "החמרת העמידות", detail: "החיידקים פיתחו עמידות גם למינון הגבוה, והזיהום התפשט למחלקות נוספות.", outcomeType: "failure" },
                "eradication": { summary: "מיגור ההתפרצות", detail: "הזיהום נעצר תוך 48 שעות. לא נרשמו מקרי הדבקה נוספים.", outcomeType: "success" },
                "sepsis": { summary: "קריסת מערכות", detail: "ללא טיפול, מצב החולים הידרדר במהירות.", outcomeType: "failure" }
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
                "safe_stop": { summary: "איזון בטיחותי", detail: "מספר התאונות ירד ב-80% וזרימת התנועה נשמרה סבירה.", outcomeType: "success" },
                "accidents_continue": { summary: "ללא שינוי", detail: "נהגים התעלמו מהתמרור והתאונות המשיכו להתרחש.", outcomeType: "failure" },
                "traffic_jam": { summary: "עומס תנועה כבד", detail: "התאונות פסקו, אך נוצרו פקקים אדירים ששיתקו את האזור.", outcomeType: "neutral" }
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
                "partial_fix": { summary: "שיפור זמני", detail: "החומציות ירדה מעט, אך לא מספיק כדי להציל את הדגים באזור הקרוב.", outcomeType: "neutral" },
                "neutralized": { summary: "שיקום מוצלח", detail: "הוספת הבסיס העלתה את ה-pH ל-7 (ניטרלי) והמערכת האקולוגית ניצלה.", outcomeType: "success" },
                "ecological_death": { summary: "אסון אקולוגי", detail: "כל הדגים ברדיוס של 1 ק״מ מתו. הנזק בלתי הפיך לשנים הקרובות.", outcomeType: "failure" }
            }
        },
        reflection: {
            questions: ["מה ההבדל בין מהילה לנטרול כימי?", "מדוע חשוב להבין את סולם ה-pH בטיפול בשפכים?"]
        }
    }
];
