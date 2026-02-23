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
                    The fastest, most secure way for Ateneo organizations to verify GCash, Maya, and BDO payments. Say goodbye to manual cross-checking and human error.
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
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>100x</div>
                        <div className="text-subtitle" style={{ fontSize: '0.875rem' }}>Faster than manual</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>100%</div>
                        <div className="text-subtitle" style={{ fontSize: '0.875rem' }}>Automated matching</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>0 Data</div>
                        <div className="text-subtitle" style={{ fontSize: '0.875rem' }}>Stored on our servers</div>
                    </div>
                </div>
            </div>

            {/* Detailed How It Works Section */}
            <div id="how-it-works" style={{ paddingTop: '6rem', paddingBottom: '6rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>How PayShield Works</h2>
                    <p className="text-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        A simple, powerful 3-step process to verify hundreds of transactions in seconds.
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
                                Gather all the GCash, Maya, or BDO receipt screenshots submitted by your members or customers. You can drag and drop an entire folder directly into the workspace. Our OCR backend will instantly extract the Reference IDs, Amounts, and Dates using advanced Vision AI.
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
                                Download the official PDF transaction history from your organization's GCash or Maya app. Upload this PDF to the workspace. This acts as the source of truth to verify the uploaded screenshots against.
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
                                PayShield automatically cross-references the extracted receipt data with the official PDF history. In seconds, you get a clean report showing exactly how many payments are verified, and a list of any forged, duplicate, or mismatched receipts that require manual review.
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
                        <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>Yes. The extraction and verification happen entirely in memory on our fast backend. We do not store your receipt photos, and we do not save your transaction history PDF. Once the request is finished, all data is immediately discarded.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>What formats are supported for the History file?</h4>
                        <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>We highly recommend using the official PDF export directly from the GCash or Maya app. Video scrolling of the transaction history is also supported as a fallback.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>What happens if a receipt doesn't match?</h4>
                        <p className="text-subtitle" style={{ fontSize: '0.95rem' }}>If a receipt amounts don't match, or the transaction ID cannot be found in the PDF, it will be flagged as a "Mismatch" in the final results table. You will see the exact filename and reason, allowing your finance team to manually investigate that specific submission.</p>
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
