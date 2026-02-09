import { useEffect, useRef, useCallback } from 'react';
import { useEditor } from '../context/EditorContext';
import { updatePortfolio } from '../services/portfolioService';
import { AUTO_SAVE_INTERVAL } from '../utils/constants';

export default function useAutoSave() {
  const { portfolio, isDirty, setSaveStatus } = useEditor();
  const timerRef = useRef(null);
  const isSavingRef = useRef(false);
  // Track the dirty version so we know if new edits happened during save
  const dirtyCountRef = useRef(0);

  // Increment dirty counter whenever isDirty becomes true
  useEffect(() => {
    if (isDirty) {
      dirtyCountRef.current += 1;
    }
  }, [isDirty]);

  const save = useCallback(async () => {
    if (!portfolio || !isDirty || isSavingRef.current) return;
    // Don't save mock portfolios (temp IDs)
    if (portfolio._id?.startsWith('mock') || portfolio._id?.startsWith('temp')) {
      console.warn('[AutoSave] Skipping save for mock portfolio:', portfolio._id);
      setSaveStatus('saved');
      return;
    }

    const dirtyAtStart = dirtyCountRef.current;
    isSavingRef.current = true;
    setSaveStatus('saving');

    try {
      const data = {
        name: portfolio.name,
        sections: portfolio.sections,
        theme: portfolio.theme,
        seo: portfolio.seo,
      };
      console.log('[AutoSave] Saving portfolio', portfolio._id, 'sections:', portfolio.sections?.length);
      const result = await updatePortfolio(portfolio._id, data);
      console.log('[AutoSave] Save successful, server returned:', result?._id || result);

      // Only mark as clean if no new edits happened while we were saving
      if (dirtyCountRef.current === dirtyAtStart) {
        setSaveStatus('saved');
      } else {
        // New edits happened during save — keep dirty so another save fires
        console.log('[AutoSave] New edits during save, staying dirty');
        setSaveStatus('unsaved');
      }
    } catch (err) {
      console.error('[AutoSave] Save failed:', err);
      setSaveStatus('error');
    } finally {
      isSavingRef.current = false;
    }
  }, [portfolio, isDirty, setSaveStatus]);

  // Auto-save timer
  useEffect(() => {
    if (isDirty) {
      timerRef.current = setTimeout(save, AUTO_SAVE_INTERVAL);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDirty, save]);

  // Warn on navigate away with unsaved changes
  useEffect(() => {
    const handler = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  return { save };
}
