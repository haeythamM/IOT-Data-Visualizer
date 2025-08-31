function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-sm py-7 mt-10">
      <div className="text-center">
        © {new Date().getFullYear()} LabJack Dashboard. Built by Haeytham Almalak.
      </div>
    </footer>
  );
}

export default Footer;
