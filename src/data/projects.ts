export interface CaseStudySection { title: string; text: string }
export interface Project {
  id: string
  number: string
  title: string
  category: string
  description: string
  focus: string
  stack: string[]
  images: { src: string | null; alt: string; label: string; width?: number; height?: number }[]
  github?: string
  backendGithub?: string
  googlePlay?: string
  role: string
  reviewNote?: string
  architecture: string[]
  architectureLayout?: 'vertical'
  sections: CaseStudySection[]
  source?: { commit: string; files: string[] }
}

export const projects: Project[] = [
  {
    id: 'ats-system', number: '03', title: 'ATS System', category: 'Full-stack application',
    images: [
      { src: '/ATS-score.png', alt: 'ATS match score preview with a sample score and category breakdown', label: 'Match score preview', width: 998, height: 1575 },
    ],
    description: 'Making résumé and job-description matching transparent, with deterministic skill extraction and weighted scoring.',
    focus: 'API design · Data consistency · Explainable scoring',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'React'],
    github: 'https://github.com/AnonymousWalker/ats-system',
    role: 'Personal project. Specific ownership and contributions are awaiting confirmation.',
    architecture: ['React UI', 'Spring Boot API', 'PostgreSQL'],
    sections: [
      { title: 'Overview', text: 'A résumé–job description matcher. Users paste or upload a résumé, supply a job description, review extracted skills, and calculate a weighted match score. The implementation exposes matched and missing skills rather than only a single number.' },
      { title: 'Key engineering decisions', text: 'Skill extraction is deterministic. Required and preferred skills have different scoring weights, and a review step lets users correct labels before calculating a result. This keeps the scoring process inspectable; it also depends on the skill catalog and cannot capture every nuance of experience.' },
      { title: 'Data consistency', text: 'The analysis service uses transactional boundaries around creation, review, and deletion. Extracted and reviewed skills are stored separately. Scoring and catalog versions are saved alongside the result, making the calculation’s context explicit.' },
      { title: 'Temporary data', text: 'The public demo treats submitted data as temporary. Scheduled cleanup deletes expired analyses and unreferenced inputs. This is an implemented lifecycle policy, not a claim that the system is production-ready for sensitive applicant data.' },
      { title: 'Validation & current scope', text: 'The repository includes scoring and extraction unit tests, PostgreSQL-backed integration tests, and a browser journey. These were inspected for this case study, not executed as part of building this portfolio. The project is a matching demo rather than a complete recruiting platform.' },
      { title: 'Further exploration', text: 'An area to explore is how catalog coverage affects match quality. Any broader recruitment features or performance improvements should be evaluated separately rather than inferred from the current implementation.' },
    ],
    source: { commit: '6401e276ea12ec3a5b4954136766c638cfc917d8', files: ['src/main/java/com/example/atssystem/analysis/AnalysisService.java', 'src/main/java/com/example/atssystem/analysis/scoring/MatchScorer.java', 'src/main/java/com/example/atssystem/cleanup/TemporaryDataCleanupService.java'] },
  },
  {
    id: 'ai-draft-translation', number: '01', title: 'AI Document Translation', category: 'Translation web application',
    images: [
      { src: '/AI-doc-translation.png', alt: 'Document Translation Tool with language selection, file upload, and completed translation jobs', label: 'Translation workspace', width: 1278, height: 900 },
      { src: '/AI-doc-icon.png', alt: 'AI Document Translation app icon with Latin and Japanese characters', label: 'App icon', width: 512, height: 512 },
    ],
    description: 'An interface for text and batch translation, with language selection, preserved terms, and progress tracking for long-running jobs.',
    focus: 'Async workflows · API integration · Translation UX',
    stack: ['React', 'TypeScript', 'Material UI', 'Python', 'FastAPI', 'SQLite'],
    github: 'https://github.com/Bible-Translation-Tools/ai-draft-translation',
    backendGithub: 'https://github.com/Bible-Translation-Tools/ai-server-translation',
    role: 'Built and deployed an AI document translation web application and cloud services in 2025, supporting DOCX, PDF, and text files.',
    architectureLayout: 'vertical',
    architecture: ['Client', 'API server', 'Job queue', 'Background worker', 'Translation engine', 'Results & download'],
    sections: [
      { title: 'Overview', text: 'A React and TypeScript interface paired with a Python and FastAPI backend and SQLite persistence. Users can translate text or submit multiple files to one or more target languages. A shared NLLB TranslationEngine powers document-specific translators behind a background job workflow.' },
      { title: 'Long-running workflows', text: 'The frontend API client uses a five-minute request timeout. Batch submission returns a job identifier and status URL; a custom queue hook polls status, tracks progress, and stops polling when a job completes, fails, or encounters an error.' },
      { title: 'Key engineering decisions', text: 'Batch files and language metadata are sent as multipart form data. A preserved-words glossary is included in job metadata. The client tracks job state separately from the submission form, so users can follow previously submitted work.' },
      { title: 'Frontend–backend connection', text: 'Clients send multipart file uploads and JSON metadata to POST /jobs. FastAPI validates the file types and metadata, creates a job identifier, saves inputs in a per-job directory, and records the queued job in SQLite. The browser polls GET /jobs/{job_id} for status and downloads the completed artifact from GET /jobs/{job_id}/result.' },
      { title: 'Background processing', text: 'FastAPI starts a single worker thread on startup. Job identifiers enter an in-memory queue; the worker claims each job and marks it processing in SQLite. The processing pipeline submits a ClearML queue placeholder and waits for the GPU queue placeholder to move before running the translation work.' },
      { title: 'Translation & results', text: 'Inputs are grouped by document type: USFM, DOCX, PPTX, XLSX, and PDF. Document-specific translators use the shared TranslationEngine to load the NLLB model, tokenize content, and generate translated output on the GPU. Translated files are written to the job’s outputs directory; multi-file or multi-language results are packaged as a ZIP. The server records the result path and marks the job completed.' },
      { title: 'Storage & execution trade-offs', text: 'SQLite stores job state, while the file system holds uploaded inputs and translated outputs. The browser separately retains job-tracking metadata in localStorage. A single worker processes the in-memory queue; persistent job records do not by themselves establish queue recovery after a server restart or parallel job execution.' },
      { title: 'Persistence trade-off', text: 'Job metadata is stored in localStorage and restored on reload. This restores job tracking, not original file contents: restored file objects retain names and sizes but do not contain the uploaded bytes. That distinction matters when considering retries and recovery.' },
      { title: 'Current scope & validation', text: 'The repository contains frontend tests for the batch translation page. Those tests were inspected, not run for this portfolio. My work included building and deploying the web application and cloud services. No translation-quality benchmarks or reliability metrics are claimed here.' },
    ],
    source: { commit: '70ba39bb2ffbf05b395fb8b8e3bfec4360840d6e', files: ['src/api/translate.ts', 'src/hooks/useJobQueue.ts', 'src/pages/BatchTranslatePage.tsx'] },
  },
  {
    id: 'biel-mobile-app', number: '02', title: 'BIEL Mobile App', category: 'Mobile reading application',
    images: [
      { src: '/biel1.webp', alt: 'BIEL Scripture reader showing Genesis with verse highlighting and audio playback controls', label: 'Reading and audio', width: 1080, height: 2400 },
      { src: '/biel2.webp', alt: 'BIEL book list with options to download Scripture and audio for offline use', label: 'Offline downloads', width: 1080, height: 2400 },
    ],
    description: 'A Scripture reading and listening app with downloadable content, offline fallback, and chapter-level audio playback.',
    focus: 'Offline data · Mobile architecture · Audio playback',
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    github: 'https://github.com/Bible-Translation-Tools/BIEL-mobile-app',
    googlePlay: 'https://play.google.com/store/apps/details?id=org.bibletranslationtools.biel',
    role: 'Owned and built the app end to end, including its architecture, Scripture reader, offline downloads, and audio playback.',
    architecture: ['Expo reader', 'API / local fallback', 'SQLite + files'],
    sections: [
      { title: 'Overview', text: 'An Expo and React Native mobile app for reading Scripture and listening to chapter audio. Expo Router organizes screens, while service modules handle content retrieval, downloads, and audio playback.' },
      { title: 'Offline architecture', text: 'Metadata and indexes are stored in SQLite; content payloads are stored in the file system. Scripture and audio have independent download paths. Text reads try the network first and fall back to downloaded content when the request fails.' },
      { title: 'Audio playback', text: 'Audio resolution checks for a local chapter file before fetching a remote streaming URL. Optional cue data maps timestamps to verses. Missing cues limit verse-level navigation without preventing basic playback.' },
      { title: 'Key engineering decisions', text: 'Downloads and playback are separate concerns: downloads populate local storage, and playback reads a local URI or a remote URL. The source also handles native media notifications and the difference between the visible chapter and the chapter currently loaded by the audio player.' },
      { title: 'Trade-offs & current scope', text: 'Offline access depends on content having been downloaded. Network-first text favors fresh data, while local-first audio avoids fetching an existing download. The repository includes reader and offline-audio tests; these were inspected, not executed as part of this portfolio. No usage or performance metrics are claimed.' },
    ],
    source: { commit: '2f123ba55c4a0cb9f070875096b98d79c1bec8af', files: ['src/api/services/reader.ts', 'src/api/services/audio.ts', 'src/db/schema.ts', 'docs/offline-mode.md', 'docs/chapter-audio.md'] },
  },
]

projects.sort((a, b) => a.number.localeCompare(b.number))
