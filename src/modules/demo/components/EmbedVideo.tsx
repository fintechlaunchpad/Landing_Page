import { embedData } from "../data/embed"
export default function EmbedVideo() {
    return (
        <section className="bg-background text-foreground w-full py-20 border-b border-border scroll-mt-16">
            <div className="container px-4 mx-auto max-w-5xl text-center">
                <div className="w-full max-w-2xl mx-auto">
                    <blockquote className="mb-6 text-xl font-medium italic text-gray-700 leading-relaxed">
                        {embedData.topic}
                        <span className="block mt-4 font-bold not-italic text-gray-900">— {embedData.creater}</span>
                    </blockquote>
                    <div className="aspect-video">
                        <iframe 
                            className="w-full h-full" 
                            src={embedData.src}                         
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}