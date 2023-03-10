import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import Venda from "./pages/Venda";
import Produtos from "./pages/Produtos";
import TiposProdutos from "./pages/TiposProdutos";
import Relatorio from "./pages/Relatorio";
import EdicaoProduto from "./pages/EdicaoProduto";
import EdicaoTipo from "./pages/EdicaoTipo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/venda" element={<Venda />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/tipos" element={<TiposProdutos />} />
                <Route path="/relatorio" element={<Relatorio />} />
                <Route
                    path="/produtos/editar/:id"
                    element={<EdicaoProduto />}
                />
                <Route path="/tipos/editar/:id" element={<EdicaoTipo />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
