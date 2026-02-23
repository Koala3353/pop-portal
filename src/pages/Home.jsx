import { Link } from 'react-router-dom'
import { ShieldCheck, FileSearch, Zap, CheckCircle2, ChevronRight, UploadCloud, FileText } from 'lucide-react'

export default function Home() {
    return (
        <div className="container">
            {/* Hero Section */}
            <div
                className="flex-center animate-fade-in"
                style={{ minHeight: 'calc(100vh - 80px)', flexDirection: 'column', textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}
            >
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                    <div style={{
                        background: 'var(--bg-tertiary)',
                        padding: '1.5rem',
                        borderRadius: 'var(--rounded-2xl)',
                        border: '1px solid var(--border-strong)',
                        boxShadow: '0 0 40px var(--accent-glow)'
                    }}>
                        <ShieldCheck size={80} className="text-gradient" />
                    </div>
                </div>

                <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                    Automate your <br /><span className="text-gradient">Payment Verifications</span>
                </h1>

                <p className="text-subtitle" style={{ fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '650px', lineHeight: '1.6' }}>
                    A fast, straightforward payment verification tool for Ateneo student orgs. No more manual cross-checking of GCash or bank screenshots against your transaction history.
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
                    <Link to="/workspace" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                        Open Workspace <ChevronRight size={20} />
                    </Link>
                    <a href="#how-it-works" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
                        How it Works
                    </a>
                </div>

                {/* Quick Stats / Trust Indicators */}
                <div className="delay-100 animate-fade-in" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', width: '100%' }}>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Save Hours</div>
                        <div className="text-subtitle" style={{ fontSize: '0.875rem' }}>Stop checking spreadsheets manually</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Bulk Process</div>
                        <div className="text-subtitle" style={{ fontSize: '0.875rem' }}>Check hundreds of receipts instantly</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Privacy First</div>
                        <div className="text-subtitle" style={{ fontSize: '0.875rem' }}>Files are discarded after verification</div>
                    </div>
                </div>
            </div>

            {/* Detailed How It Works Section */}
            <div id="how-it-works" style={{ paddingTop: '6rem', paddingBottom: '6rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>How Pop Portal Works</h2>
                    <p className="text-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Verify your organization's payments in three simple steps.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', maxWidth: '900px', margin: '0 auto' }}>
                    {/* Step 1 */}
                    <div className="glass-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: 'var(--rounded-xl)', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <UploadCloud size={48} className="text-gradient" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>1. Upload Receipt Screenshots</h3>
                            <p className="text-subtitle">
                                Collect your payment screenshots from Google Forms or your members. Drag and drop the whole folder directly into the workspace, and the system will instantly extract the amounts and reference numbers.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="glass-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
                        <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: 'var(--rounded-xl)', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <FileText size={48} className="text-gradient" />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>2. Provide Official Transaction History</h3>
                            <p className="text-subtitle">
                                Export your official transaction history PDF from your org's GCash, Maya, or bank account. Upload it to the workspace to act as the source of truth for verification.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="glass-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: 'var(--rounded-xl)', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <CheckCircle2 size={48} className="text-gradient" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>3. Instant Verification & Mismatch Report</h3>
                            <p className="text-subtitle">
                                The system instantly cross-references the student screenshots with your official PDF history. It generates a clean report showing which payments are verified and a list of any forged, duplicate, or mismatched receipts that need double-checking.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div style={{ paddingTop: '4rem', paddingBottom: '8rem', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Is my data secure?</h4>
                        <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>Yes. Verification happens in-memory on the backend. We don't save any receipt photos or transaction history files after you close the page.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>What formats are supported for the History file?</h4>
                        <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>We highly recommend using the official PDF export directly from the GCash or Maya app. Video scrolling of the transaction history is also supported as a fallback.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>What happens if a receipt doesn't match?</h4>
                        <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>If an amount or reference number doesn't fully match your PDF history, it will be flagged as a 'Mismatch' or 'Not Found' in the final report. You'll see the exact file name and the reason so your finance team can investigate.</p>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div style={{ textAlign: 'center', paddingBottom: '6rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to speed up your process?</h2>
                <Link to="/workspace" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.25rem' }}>
                    Verify Payments Now
                </Link>
            </div>
        </div>
    )
}
