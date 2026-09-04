import { LINKS } from "../data/profile";
import { ExternalIcon, DownloadIcon } from "./Icons";
import "./Resume.css";

export default function Resume() {
  return (
    <section className="sec" id="resume">
      <div className="wrap">
        <div className="resume-band rv">
          <div className="resume-copy">
            <h2>Resume</h2>
            <p>
              Two pages: full technical stack, six project engagements with dates, and the
              temple platform. Open it in Drive or pull down the PDF.
            </p>
          </div>
          <div className="resume-actions">
            <a
              className="btn btn-onink-solid"
              href={LINKS.resumeView}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalIcon /> View resume
            </a>
            <a className="btn btn-onink" href={LINKS.resumeDownload}>
              <DownloadIcon /> Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
