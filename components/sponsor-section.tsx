import Image from "next/image"

export default function SponsorSection() {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-8">Sponsors</h3>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <a
          href="https://www.con-terra.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-40 h-40">
            <Image src="/images/sponsors/conterra.png" alt="con terra" fill className="object-contain p-2" />
          </div>
        </a>

        <a
          href="https://www.esri.de/de-de/home"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-40 h-40">
            <Image src="/images/sponsors/esri-germany.png" alt="ESRI Germany" fill className="object-contain p-2" />
          </div>
        </a>

        <a
          href="https://52north.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-40 h-40">
            <Image src="/images/sponsors/52north.png" alt="52North" fill className="object-contain p-2" />
          </div>
        </a>
      </div>

      <h3 className="text-2xl font-bold text-center mb-8">Partners</h3>

      <div className="flex flex-wrap justify-center gap-8">
        <a
          href="https://mastergeotech.info/"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-32 h-32">
            <Image src="/images/partners/master-geotech.png" alt="Master Geotech" fill className="object-contain" />
          </div>
        </a>

        <a
          href="http://www.init.uji.es/"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-32 h-32">
            <Image src="/images/partners/init.png" alt="INIT" fill className="object-contain" />
          </div>
        </a>

        <a
          href="https://www.novaims.unl.pt/geotech"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-32 h-32">
            <Image src="/images/partners/ims.png" alt="NOVA IMS" fill className="object-contain" />
          </div>
        </a>

        <a
          href="https://www.uni-muenster.de/Geoinformatics/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative w-32 h-32">
            <Image src="/images/partners/ifgi.png" alt="IFGI" fill className="object-contain" />
          </div>
        </a>
      </div>
    </div>
  )
}
