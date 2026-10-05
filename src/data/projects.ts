export interface CaseStudySection { title: string; text: string }
export interface Project {
  id: string
  number: string
  title: string
  category: string
  description: string
  focus: string
  stack: string[]
  images: { src: string | null; alt: string; label: string }[]
  github?: string
  role: string
  reviewNote?: string
  architecture: string[]
  sections: CaseStudySection[]
  source?: { commit: string; files: string[] }
}

export const projects: Project[] = [
  {
    id: 'ats-system', number: '03', title: 'ATS System', category: 'Full-stack application',
    images: [
      { src: null, alt: 'ATS System overview', label: 'Project overview' },
      { src: null, alt: 'ATS System detail', label: 'A closer look' },
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
    id: 'ai-draft-translation', number: '01', title: 'AI Draft Translation', category: 'Translation web application',
    images: [
      { src: null, alt: 'AI Draft Translation overview', label: 'Project overview' },
      { src: null, alt: 'AI Draft Translation detail', label: 'A closer look' },
    ],
    description: 'An interface for text and batch translation, with language selection, preserved terms, and progress tracking for long-running jobs.',
    focus: 'Async workflows · API integration · Translation UX',
    stack: ['React', 'TypeScript', 'Material UI', 'Axios'],
    github: 'https://github.com/Bible-Translation-Tools/ai-draft-translation',
    role: 'Personal contributions to be confirmed. This case study describes the repository’s implementation without attributing all of it to me.',
    architecture: ['React UI', 'Translation API', 'Job status polling'],
    sections: [
      { title: 'Overview', text: 'A React and TypeScript frontend for a translation service described by the repository as NLLB-based. Users can translate text or submit multiple files to one or more target languages. The model and backend are external dependencies, not implemented by this frontend repository.' },
      { title: 'Long-running workflows', text: 'The Axios client uses a five-minute request timeout. Batch submission returns a job identifier and status URL; a custom queue hook polls status, tracks progress, and stops polling when a job completes, fails, or encounters an error.' },
      { title: 'Key engineering decisions', text: 'Batch files and language metadata are sent as multipart form data. A preserved-words glossary is included in job metadata. The client tracks job state separately from the submission form, so users can follow previously submitted work.' },
      { title: 'Persistence trade-off', text: 'Job metadata is stored in localStorage and restored on reload. This restores job tracking, not original file contents: restored file objects retain names and sizes but do not contain the uploaded bytes. That distinction matters when considering retries and recovery.' },
      { title: 'Current scope & validation', text: 'The repository contains frontend tests for the batch translation page. Those tests were inspected, not run for this portfolio. Translation quality, backend reliability, and my specific contribution are not claimed here.' },
    ],
    source: { commit: '70ba39bb2ffbf05b395fb8b8e3bfec4360840d6e', files: ['src/api/translate.ts', 'src/hooks/useJobQueue.ts', 'src/pages/BatchTranslatePage.tsx'] },
  },
  {
    id: 'biel-mobile-app', number: '02', title: 'BIEL Mobile App', category: 'Mobile reading application',
    images: [
      { src: null, alt: 'BIEL Mobile App overview', label: 'Project overview' },
      { src: null, alt: 'BIEL Mobile App detail', label: 'A closer look' },
    ],
    description: 'A Scripture reading and listening app with downloadable content, offline fallback, and chapter-level audio playback.',
    focus: 'Offline data · Mobile architecture · Audio playback',
    stack: ['React Native', 'Expo', 'TypeScript', 'SQLite'],
    github: 'https://github.com/Bible-Translation-Tools/BIEL-mobile-app',
    role: 'Personal contributions to be confirmed. Features described here are verified in the repository, not attributed solely to me.',
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
