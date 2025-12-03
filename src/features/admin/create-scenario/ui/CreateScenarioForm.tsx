import React, { useState } from 'react';
import { Wand2, FileText, Image as ImageIcon, BarChart3, TrendingUp, HelpCircle, CheckCircle, Save, PieChart as PieChartIcon, Trash2, Plus, X } from 'lucide-react';
import { useStore } from '../../../../app/store';
import { generateScenarioFromTopic, generateSection } from '../../../../shared/api/geminiService';
import { Scenario } from '../../../../entities/scenario';
import { Button, Input, TextArea } from '../../../../shared/ui/DesignSystem';

// Category options for dropdown
const CATEGORY_OPTIONS = [
    { value: 'פיזיקה / מדעי הסביבה', label: { en: 'Physics / Environmental Science', he: 'פיזיקה / מדעי הסביבה' } },
    { value: 'אקולוגיה / תכנון עירוני', label: { en: 'Ecology / Urban Planning', he: 'אקולוגיה / תכנון עירוני' } },
    { value: 'הנדסה / פיזיקה', label: { en: 'Engineering / Physics', he: 'הנדסה / פיזיקה' } },
    { value: 'מתמטיקה / חקר ביצועים', label: { en: 'Mathematics / Operations Research', he: 'מתמטיקה / חקר ביצועים' } },
    { value: 'ביולוגיה / רפואה', label: { en: 'Biology / Medicine', he: 'ביולוגיה / רפואה' } },
    { value: 'פיזיקה / קינמטיקה', label: { en: 'Physics / Kinematics', he: 'פיזיקה / קינמטיקה' } },
    { value: 'כימיה / איכות סביבה', label: { en: 'Chemistry / Environmental Quality', he: 'כימיה / איכות סביבה' } },
    { value: 'מדעי המחשב / אלגוריתמים', label: { en: 'Computer Science / Algorithms', he: 'מדעי המחשב / אלגוריתמים' } },
    { value: 'גיאוגרפיה / אקלים', label: { en: 'Geography / Climate', he: 'גיאוגרפיה / אקלים' } },
];

// Duration options for dropdown
const DURATION_OPTIONS = [
    { value: '10 דקות', label: { en: '10 minutes', he: '10 דקות' } },
    { value: '15 דקות', label: { en: '15 minutes', he: '15 דקות' } },
    { value: '20 דקות', label: { en: '20 minutes', he: '20 דקות' } },
    { value: '25 דקות', label: { en: '25 minutes', he: '25 דקות' } },
    { value: '30 דקות', label: { en: '30 minutes', he: '30 דקות' } },
    { value: '45 דקות', label: { en: '45 minutes', he: '45 דקות' } },
    { value: '60 דקות', label: { en: '60 minutes', he: '60 דקות' } },
];

// Chart type options
const CHART_TYPE_OPTIONS = [
    { value: 'bar', label: { en: 'Bar Chart', he: 'תרשים עמודות' } },
    { value: 'pie', label: { en: 'Pie Chart', he: 'תרשים עוגה' } },
    { value: 'line', label: { en: 'Line Chart', he: 'תרשים קווי' } },
];

export const CreateScenarioForm = ({ onSave, onCancel, initialData }: { onSave: (s: Scenario) => void; onCancel: () => void; initialData?: Scenario | null }) => {
    const { t, language } = useStore();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatingSection, setGeneratingSection] = useState<string | null>(null);
    const [topicPrompt, setTopicPrompt] = useState('');
    const [formData, setFormData] = useState<Partial<Scenario>>(initialData || {
        id: crypto.randomUUID(),
        title: '',
        category: '',
        duration: '',
        opening: { description: '', imageUrl: '' },
        problem: { text: '', context: '', imageUrl: '' },
        data: { description: '', chartType: 'bar', chartData: [] },
        analysis: { questions: [], keyTerms: [] },
        solutions: { options: [] },
        simulation: { results: {} },
        reflection: { questions: [] }
    });

    const handleGenerate = async () => {
        if (!topicPrompt.trim()) return;
        setIsGenerating(true);
        try {
            const generated = await generateScenarioFromTopic(topicPrompt);
            if (generated) {
                setFormData(prev => ({
                    ...prev,
                    ...generated,
                    id: prev.id // Keep the ID
                }));
            }
        } catch (error) {
            console.error("Failed to generate", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSectionGenerate = async (section: 'problem' | 'data' | 'analysis' | 'solutions' | 'reflection') => {
        const topic = topicPrompt || formData.title || "STEM Scenario";
        setGeneratingSection(section);
        try {
            const result = await generateSection(section, topic);
            if (result) {
                setFormData(prev => ({
                    ...prev,
                    [section]: { ...prev[section] as any, ...result }
                }));
            }
        } catch (error) {
            console.error(`Failed to generate ${section}`, error);
        } finally {
            setGeneratingSection(null);
        }
    };

    const handleInputChange = (section: keyof Scenario, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section] as any,
                [field]: value
            }
        }));
    };

    const handleRootChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const renderStep = () => {
        switch (step) {
            case 1: return (
                <div className="space-y-6 animate-fade-in">
                    {/* AI Generator Section */}
                    {!initialData && (
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100 mb-8">
                            <div className="flex items-center gap-2 mb-3 text-purple-800 font-bold">
                                <Wand2 size={20} />
                                <h3>{t('ai_generator') || "AI Scenario Generator"}</h3>
                            </div>
                            <div className="flex gap-3">
                                <Input
                                    placeholder={t('enter_topic') || "Enter a topic (e.g., 'Water Conservation in Urban Areas')"}
                                    value={topicPrompt}
                                    onChange={(e) => setTopicPrompt(e.target.value)}
                                    className="bg-white"
                                />
                                <Button
                                    onClick={handleGenerate}
                                    isLoading={isGenerating}
                                    variant="secondary"
                                    leftIcon={<Wand2 size={16} />}
                                >
                                    {t('generate') || "Generate"}
                                </Button>
                            </div>
                            <p className="text-xs text-purple-600 mt-2">
                                {t('ai_hint') || "Powered by Gemini AI. Enter a topic and let AI create the initial structure for you."}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-surface-900">{t('step_1_opening')}</h3>
                            <p className="text-sm text-surface-500">Basic scenario information</p>
                        </div>
                    </div>
                    <div className="grid gap-5">
                        <div>
                            <Input
                                label={t('scenario_title')}
                                value={formData.title}
                                onChange={e => handleRootChange('title', e.target.value)}
                                placeholder={language === 'he' ? 'הכנס כותרת לתרחיש...' : t('enter_title')}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-surface-700 mb-2">{t('category')} <span className="text-accent-500">*</span></label>
                                <select
                                    className="w-full p-2.5 border border-surface-200 rounded-lg bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none cursor-pointer"
                                    value={formData.category}
                                    onChange={e => handleRootChange('category', e.target.value)}
                                >
                                    <option value="">{language === 'he' ? 'בחר קטגוריה...' : t('select_category')}</option>
                                    {CATEGORY_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {language === 'he' ? opt.label.he : opt.label.en}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-surface-700 mb-2">{t('duration')} <span className="text-accent-500">*</span></label>
                                <select
                                    className="w-full p-2.5 border border-surface-200 rounded-lg bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none cursor-pointer"
                                    value={formData.duration}
                                    onChange={e => handleRootChange('duration', e.target.value)}
                                >
                                    <option value="">{language === 'he' ? 'בחר משך...' : t('select_duration')}</option>
                                    {DURATION_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {language === 'he' ? opt.label.he : opt.label.en}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <TextArea
                                label={t('scenario_description')}
                                value={formData.opening?.description}
                                onChange={e => handleInputChange('opening', 'description', e.target.value)}
                                placeholder={language === 'he' ? 'תאר את התרחיש בקצרה...' : t('brief_description')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-surface-700 mb-2">{t('image_url')}</label>
                            <div className="flex gap-3">
                                <Input
                                    className="flex-1"
                                    value={formData.opening?.imageUrl}
                                    onChange={e => handleInputChange('opening', 'imageUrl', e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                />
                                <button type="button" className="px-4 py-2 bg-surface-100 text-surface-600 rounded-xl hover:bg-surface-200 transition-colors flex items-center gap-2">
                                    <ImageIcon size={18} />
                                </button>
                            </div>
                            <p className="text-xs text-surface-400 mt-1.5">{language === 'he' ? 'השתמש בתמונה מ-Unsplash או כתובת URL אחרת' : t('use_image_url')}</p>
                        </div>
                    </div>
                </div>
            );
            case 2: return (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-surface-900">{t('step_2_problem')}</h3>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSectionGenerate('problem')}
                            isLoading={generatingSection === 'problem'}
                            leftIcon={<Wand2 size={16} />}
                            className="text-purple-600 hover:bg-purple-50"
                        >
                            {t('generate_with_ai') || "Generate with AI"}
                        </Button>
                    </div>
                    <div className="grid gap-4">
                        <TextArea
                            label={t('problem_statement')}
                            value={formData.problem?.text}
                            onChange={e => handleInputChange('problem', 'text', e.target.value)}
                            rows={4}
                        />
                        <TextArea
                            label={t('context')}
                            value={formData.problem?.context}
                            onChange={e => handleInputChange('problem', 'context', e.target.value)}
                            rows={3}
                        />
                        <Input
                            label={t('image_url')}
                            value={formData.problem?.imageUrl}
                            onChange={e => handleInputChange('problem', 'imageUrl', e.target.value)}
                        />
                    </div>
                </div>
            );
            case 3: return (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <BarChart3 size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-surface-900">{t('data_analysis')}</h3>
                            <p className="text-sm text-surface-500">{language === 'he' ? 'הגדר את הנתונים שיוצגו לתלמידים' : 'Configure data to be shown to students'}</p>
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSectionGenerate('data')}
                            isLoading={generatingSection === 'data'}
                            leftIcon={<Wand2 size={16} />}
                            className="text-purple-600 hover:bg-purple-50 ml-auto"
                        >
                            {t('generate_with_ai') || "Generate with AI"}
                        </Button>
                    </div>
                    <div className="grid gap-5">
                        <TextArea
                            label={t('description')}
                            value={formData.data?.description}
                            onChange={e => handleInputChange('data', 'description', e.target.value)}
                            placeholder={language === 'he' ? 'תאר את הנתונים שיוצגו בתרשים...' : 'Describe the data to be shown in the chart...'}
                            rows={3}
                        />
                        <div>
                            <label className="block text-sm font-semibold text-surface-700 mb-2">{t('chart_type')} <span className="text-accent-500">*</span></label>
                            <div className="grid grid-cols-3 gap-3">
                                {CHART_TYPE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleInputChange('data', 'chartType', opt.value)}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${formData.data?.chartType === opt.value
                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                            : 'border-surface-200 bg-white text-surface-600 hover:border-primary-200 hover:bg-primary-50/50'
                                            }`}
                                    >
                                        {opt.value === 'bar' && <BarChart3 size={24} />}
                                        {opt.value === 'pie' && <PieChartIcon size={24} />}
                                        {opt.value === 'line' && <TrendingUp size={24} />}
                                        <span className="text-sm font-medium">{language === 'he' ? opt.label.he : opt.label.en}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-accent-50 border border-accent-100 rounded-xl p-4 flex gap-3">
                            <HelpCircle size={20} className="text-accent-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-accent-800 font-medium">{language === 'he' ? 'טיפ' : 'Tip'}</p>
                                <p className="text-xs text-accent-700">{language === 'he' ? 'נקודות הנתונים יכולות להיערך בשלב מתקדם יותר או מיובאות מקובץ CSV.' : 'Data points can be edited in advanced mode or imported from CSV.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 4: return (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-surface-900">{t('critical_analysis')}</h3>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSectionGenerate('analysis')}
                            isLoading={generatingSection === 'analysis'}
                            leftIcon={<Wand2 size={16} />}
                            className="text-purple-600 hover:bg-purple-50"
                        >
                            {t('generate_with_ai') || "Generate with AI"}
                        </Button>
                    </div>
                    <div className="grid gap-4">
                        <TextArea
                            label={t('analysis_questions')}
                            helperText="Separate questions with a new line"
                            value={formData.analysis?.questions.join('\n')}
                            onChange={e => handleInputChange('analysis', 'questions', e.target.value.split('\n'))}
                            rows={6}
                        />
                        <Input
                            label={t('key_terms')}
                            helperText="Comma separated"
                            value={formData.analysis?.keyTerms.join(', ')}
                            onChange={e => handleInputChange('analysis', 'keyTerms', e.target.value.split(',').map(s => s.trim()))}
                        />
                    </div>
                </div>
            );
            case 5: return (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-surface-900">{t('solution_options')}</h3>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSectionGenerate('solutions')}
                                isLoading={generatingSection === 'solutions'}
                                leftIcon={<Wand2 size={16} />}
                                className="text-purple-600 hover:bg-purple-50"
                            >
                                {t('generate_with_ai') || "Generate with AI"}
                            </Button>
                            <Button
                                onClick={() => {
                                    const newId = `opt_${Date.now()}`;
                                    const newResultId = `res_${Date.now()}`;
                                    setFormData(prev => ({
                                        ...prev,
                                        solutions: {
                                            options: [
                                                ...(prev.solutions?.options || []),
                                                { id: newId, text: '', correct: false, resultId: newResultId }
                                            ]
                                        },
                                        simulation: {
                                            results: {
                                                ...(prev.simulation?.results || {}),
                                                [newResultId]: { summary: '', detail: '', outcomeType: 'neutral' }
                                            }
                                        }
                                    }));
                                }}
                                leftIcon={<Plus size={16} />}
                                size="sm"
                            >
                                {t('add_option')}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        {formData.solutions?.options.map((option, idx) => (
                            <div key={option.id} className="bg-surface-50 p-4 rounded-xl border border-surface-200 relative group">
                                <button
                                    onClick={() => {
                                        const newOptions = [...(formData.solutions?.options || [])];
                                        newOptions.splice(idx, 1);
                                        // Also remove associated result
                                        const newResults = { ...(formData.simulation?.results || {}) };
                                        delete newResults[option.resultId];

                                        setFormData(prev => ({
                                            ...prev,
                                            solutions: { options: newOptions },
                                            simulation: { results: newResults }
                                        }));
                                    }}
                                    className="absolute top-2 right-2 rtl:right-auto rtl:left-2 text-surface-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                                <div className="grid gap-3">
                                    <Input
                                        label={`${t('option')} ${idx + 1}`}
                                        value={option.text}
                                        onChange={e => {
                                            const newOptions = [...(formData.solutions?.options || [])];
                                            newOptions[idx].text = e.target.value;
                                            setFormData(prev => ({ ...prev, solutions: { options: newOptions } }));
                                        }}
                                        placeholder={language === 'he' ? 'תיאור הפתרון...' : 'Solution description...'}
                                    />
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={option.correct}
                                                onChange={e => {
                                                    const newOptions = [...(formData.solutions?.options || [])];
                                                    newOptions[idx].correct = e.target.checked;
                                                    setFormData(prev => ({ ...prev, solutions: { options: newOptions } }));
                                                }}
                                                className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-sm font-medium text-surface-700">{t('is_correct')}</span>
                                        </label>
                                        <div className="text-xs text-surface-400 font-mono bg-surface-100 px-2 py-1 rounded">
                                            ID: {option.resultId}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {(!formData.solutions?.options || formData.solutions.options.length === 0) && (
                            <div className="text-center py-8 text-surface-500 bg-surface-50 rounded-xl border border-dashed border-surface-300">
                                {language === 'he' ? 'אין אפשרויות. הוסף אפשרות חדשה.' : 'No options. Add a new option.'}
                            </div>
                        )}
                    </div>
                </div>
            );
            case 6: return (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-surface-900">{t('simulation_results')}</h3>
                    <p className="text-sm text-surface-500 mb-4">
                        {language === 'he'
                            ? 'הגדר את התוצאה עבור כל אפשרות פתרון שהוגדרה בשלב הקודם.'
                            : 'Define the outcome for each solution option defined in the previous step.'}
                    </p>
                    <div className="grid gap-6">
                        {formData.solutions?.options.map((option, idx) => {
                            const result = formData.simulation?.results[option.resultId] || { summary: '', detail: '', outcomeType: 'neutral' };
                            return (
                                <div key={option.id} className="bg-surface-50 p-5 rounded-xl border border-surface-200">
                                    <div className="mb-4 pb-3 border-b border-surface-200 flex justify-between items-center">
                                        <h4 className="font-bold text-surface-800 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center text-xs">{idx + 1}</span>
                                            {option.text || (language === 'he' ? '(ללא כותרת)' : '(Untitled Option)')}
                                        </h4>
                                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${option.correct ? 'bg-emerald-100 text-emerald-700' : 'bg-surface-200 text-surface-600'}`}>
                                            {option.correct ? t('correct') : t('incorrect')}
                                        </span>
                                    </div>
                                    <div className="grid gap-4">
                                        <Input
                                            label={t('result_summary')}
                                            value={result.summary}
                                            onChange={e => {
                                                const newResults = { ...(formData.simulation?.results || {}) };
                                                newResults[option.resultId] = { ...result, summary: e.target.value };
                                                setFormData(prev => ({ ...prev, simulation: { results: newResults } }));
                                            }}
                                            placeholder={language === 'he' ? 'כותרת התוצאה...' : 'Outcome headline...'}
                                        />
                                        <TextArea
                                            label={t('result_detail')}
                                            value={result.detail}
                                            onChange={e => {
                                                const newResults = { ...(formData.simulation?.results || {}) };
                                                newResults[option.resultId] = { ...result, detail: e.target.value };
                                                setFormData(prev => ({ ...prev, simulation: { results: newResults } }));
                                            }}
                                            rows={3}
                                            placeholder={language === 'he' ? 'תיאור מפורט של מה קרה בעקבות הבחירה...' : 'Detailed description of what happened...'}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-surface-700 mb-2">{t('outcome')} <span className="text-accent-500">*</span></label>
                                                <select
                                                    className="w-full p-2.5 border border-surface-200 rounded-lg bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                                    value={result.outcomeType}
                                                    onChange={e => {
                                                        const newResults = { ...(formData.simulation?.results || {}) };
                                                        newResults[option.resultId] = { ...result, outcomeType: e.target.value as any };
                                                        setFormData(prev => ({ ...prev, simulation: { results: newResults } }));
                                                    }}
                                                >
                                                    <option value="success">{language === 'he' ? 'הצלחה' : 'Success'}</option>
                                                    <option value="failure">{language === 'he' ? 'כישלון' : 'Failure'}</option>
                                                    <option value="neutral">{language === 'he' ? 'ניטרלי' : 'Neutral'}</option>
                                                </select>
                                            </div>
                                            <Input
                                                label={t('image_url')}
                                                value={result.outcomeImageUrl || ''}
                                                onChange={e => {
                                                    const newResults = { ...(formData.simulation?.results || {}) };
                                                    newResults[option.resultId] = { ...result, outcomeImageUrl: e.target.value };
                                                    setFormData(prev => ({ ...prev, simulation: { results: newResults } }));
                                                }}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
            case 7: return (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-surface-900">{t('reflection')}</h3>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSectionGenerate('reflection')}
                            isLoading={generatingSection === 'reflection'}
                            leftIcon={<Wand2 size={16} />}
                            className="text-purple-600 hover:bg-purple-50"
                        >
                            {t('generate_with_ai') || "Generate with AI"}
                        </Button>
                    </div>
                    <div className="grid gap-4">
                        <TextArea
                            label={t('reflection_questions')}
                            helperText="Separate questions with a new line"
                            value={formData.reflection?.questions.join('\n')}
                            onChange={e => handleInputChange('reflection', 'questions', e.target.value.split('\n'))}
                            rows={6}
                        />
                    </div>
                </div>
            );
            default: return (
                <div className="text-center py-10">
                    <CheckCircle size={48} className="mx-auto text-secondary-500 mb-4" />
                    <h3 className="text-xl font-bold text-surface-900">{t('ready_to_create')}</h3>
                    <p className="text-surface-500">{t('review_scenario')}</p>
                </div>
            );
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-surface-200 shadow-xl overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-8 border-b border-surface-100 flex justify-between items-center bg-surface-50/50">
                <div>
                    <h2 className="text-2xl font-extrabold text-surface-900">{t('create_new')}</h2>
                    <p className="text-surface-500 text-sm">{t('step')} {step} {t('of')} 7</p>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <div key={s} className={`w-2 h-2 rounded-full transition-all ${step >= s ? 'bg-primary-600' : 'bg-surface-200'}`}></div>
                    ))}
                </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
                {renderStep()}
            </div>

            <div className="p-6 border-t border-surface-100 bg-surface-50 flex justify-between items-center">
                <Button
                    variant="ghost"
                    onClick={() => step === 1 ? onCancel() : setStep(s => Math.max(1, s - 1))}
                >
                    {t('back')}
                </Button>

                {step < 8 ? (
                    <Button
                        onClick={() => setStep(s => Math.min(8, s + 1))}
                    >
                        {t('continue')}
                    </Button>
                ) : (
                    <Button
                        onClick={() => onSave(formData as Scenario)}
                        variant="secondary"
                        leftIcon={<Save size={18} />}
                    >
                        {t('save_library')}
                    </Button>
                )}
            </div>
        </div>
    );
};
