import { createContext, useContext, useReducer, useCallback } from 'react';
import { MAX_SECTIONS } from '../utils/constants';

const EditorContext = createContext(null);

const initialState = {
  portfolio: null,
  selectedSectionId: null,
  saveStatus: 'saved', // 'saved' | 'saving' | 'unsaved' | 'error'
  lastSavedAt: null,
  sidebarTab: 'sections', // 'sections' | 'theme'
  sidebarCollapsed: false,
  previewDevice: 'desktop', // 'desktop' | 'tablet' | 'mobile'
  isDirty: false,
};

function editorReducer(state, action) {
  switch (action.type) {
    case 'SET_PORTFOLIO':
      return { ...state, portfolio: action.payload, isDirty: false, saveStatus: 'saved' };

    case 'SELECT_SECTION':
      return { ...state, selectedSectionId: action.payload };

    case 'DESELECT_SECTION':
      return { ...state, selectedSectionId: null };

    case 'UPDATE_SECTION_CONTENT': {
      const { sectionId, content } = action.payload;
      const sections = state.portfolio.sections.map((s) =>
        s._id === sectionId ? { ...s, content: { ...s.content, ...content } } : s
      );
      return {
        ...state,
        portfolio: { ...state.portfolio, sections },
        isDirty: true,
        saveStatus: 'unsaved',
      };
    }

    case 'ADD_SECTION': {
      if (state.portfolio.sections.length >= MAX_SECTIONS) return state;
      const newSection = {
        _id: `temp-${Date.now()}`,
        type: action.payload.type,
        order: state.portfolio.sections.length,
        content: action.payload.defaultContent || {},
        visible: true,
      };
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          sections: [...state.portfolio.sections, newSection],
        },
        isDirty: true,
        saveStatus: 'unsaved',
      };
    }

    case 'REMOVE_SECTION': {
      const sections = state.portfolio.sections
        .filter((s) => s._id !== action.payload)
        .map((s, i) => ({ ...s, order: i }));
      return {
        ...state,
        portfolio: { ...state.portfolio, sections },
        selectedSectionId: state.selectedSectionId === action.payload ? null : state.selectedSectionId,
        isDirty: true,
        saveStatus: 'unsaved',
      };
    }

    case 'REORDER_SECTIONS': {
      const sections = action.payload.map((s, i) => ({ ...s, order: i }));
      return {
        ...state,
        portfolio: { ...state.portfolio, sections },
        isDirty: true,
        saveStatus: 'unsaved',
      };
    }

    case 'TOGGLE_SECTION_VISIBILITY': {
      const sections = state.portfolio.sections.map((s) =>
        s._id === action.payload ? { ...s, visible: !s.visible } : s
      );
      return {
        ...state,
        portfolio: { ...state.portfolio, sections },
        isDirty: true,
        saveStatus: 'unsaved',
      };
    }

    case 'UPDATE_THEME': {
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          theme: { ...state.portfolio.theme, ...action.payload },
        },
        isDirty: true,
        saveStatus: 'unsaved',
      };
    }

    case 'UPDATE_NAME':
      return {
        ...state,
        portfolio: { ...state.portfolio, name: action.payload },
        isDirty: true,
        saveStatus: 'unsaved',
      };

    case 'SET_SAVE_STATUS':
      return {
        ...state,
        saveStatus: action.payload,
        ...(action.payload === 'saved' ? { isDirty: false, lastSavedAt: new Date() } : {}),
      };

    case 'SET_SIDEBAR_TAB':
      return { ...state, sidebarTab: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };

    case 'SET_PREVIEW_DEVICE':
      return { ...state, previewDevice: action.payload };

    default:
      return state;
  }
}

export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const actions = {
    setPortfolio: useCallback((portfolio) =>
      dispatch({ type: 'SET_PORTFOLIO', payload: portfolio }), []),
    selectSection: useCallback((id) =>
      dispatch({ type: 'SELECT_SECTION', payload: id }), []),
    deselectSection: useCallback(() =>
      dispatch({ type: 'DESELECT_SECTION' }), []),
    updateSectionContent: useCallback((sectionId, content) =>
      dispatch({ type: 'UPDATE_SECTION_CONTENT', payload: { sectionId, content } }), []),
    addSection: useCallback((type, defaultContent) =>
      dispatch({ type: 'ADD_SECTION', payload: { type, defaultContent } }), []),
    removeSection: useCallback((id) =>
      dispatch({ type: 'REMOVE_SECTION', payload: id }), []),
    reorderSections: useCallback((sections) =>
      dispatch({ type: 'REORDER_SECTIONS', payload: sections }), []),
    toggleSectionVisibility: useCallback((id) =>
      dispatch({ type: 'TOGGLE_SECTION_VISIBILITY', payload: id }), []),
    updateTheme: useCallback((theme) =>
      dispatch({ type: 'UPDATE_THEME', payload: theme }), []),
    updateName: useCallback((name) =>
      dispatch({ type: 'UPDATE_NAME', payload: name }), []),
    setSaveStatus: useCallback((status) =>
      dispatch({ type: 'SET_SAVE_STATUS', payload: status }), []),
    setSidebarTab: useCallback((tab) =>
      dispatch({ type: 'SET_SIDEBAR_TAB', payload: tab }), []),
    toggleSidebar: useCallback(() =>
      dispatch({ type: 'TOGGLE_SIDEBAR' }), []),
    setPreviewDevice: useCallback((device) =>
      dispatch({ type: 'SET_PREVIEW_DEVICE', payload: device }), []),
  };

  return (
    <EditorContext.Provider value={{ ...state, ...actions }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
