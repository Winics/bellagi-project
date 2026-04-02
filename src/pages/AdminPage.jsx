import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "./admin.css";

export default function AdminPage() {

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [categories, setCategories] = useState(() => {
    return JSON.parse(localStorage.getItem("categories")) || [
      "Sutiã",
      "Calcinha",
      "Moldes"
    ];
  });

  const [newCategory, setNewCategory] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    sizes: [],
    colors: [],
    images: [],
    description: "",
    featured: false
  });

  const [sizeInput, setSizeInput] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorValue, setColorValue] = useState("#000000");

  // 🔥 carregar produtos
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // 🔥 salvar produtos
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // 🔥 salvar categorias
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // 📏 TAMANHOS
  function addSize() {
    if (!sizeInput || form.sizes.includes(sizeInput)) return;

    setForm(prev => ({
      ...prev,
      sizes: [...prev.sizes, sizeInput]
    }));

    setSizeInput("");
  }

  function removeSize(size) {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  }

  // 🎨 CORES
  function addColor() {
    if (!colorName || !colorValue) return;

    setForm(prev => ({
      ...prev,
      colors: [...prev.colors, { name: colorName, value: colorValue }]
    }));

    setColorName("");
    setColorValue("#000000");
  }

  function removeColor(index) {
    setForm(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  }

  // 📸 UPLOAD REAL (SUPABASE)
  async function handleImages(e) {
    const files = Array.from(e.target.files).slice(0, 4);

    const uploadedImages = [];

    for (let file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (error) {
        console.error("Erro upload:", error);
        continue;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      uploadedImages.push(data.publicUrl);
    }

    setForm(prev => ({
      ...prev,
      images: uploadedImages
    }));
  }

  // 🏷️ CATEGORIA
  function addCategory() {
    if (!newCategory || categories.includes(newCategory)) return;

    setCategories(prev => [...prev, newCategory]);
    setNewCategory("");
  }

  // ✏️ EDITAR
  function editProduct(product) {
    setForm(product);
    setEditingId(product.id);
  }

  // 🗑️ EXCLUIR
  function deleteProduct(id) {
    if (!confirm("Deseja excluir este produto?")) return;

    setProducts(prev => prev.filter(p => p.id !== id));
  }

  // 💾 SALVAR
  function addProduct() {
    if (!form.name || !form.price) {
      alert("Preencha nome e preço");
      return;
    }

    if (editingId) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editingId ? { ...form, id: editingId } : p
        )
      );
      setEditingId(null);

    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
        images: form.images.length
          ? form.images
          : ["https://placehold.co/600x800"]
      };

      setProducts(prev => [...prev, newProduct]);
    }

    // reset
    setForm({
      name: "",
      price: "",
      category: "",
      sizes: [],
      colors: [],
      images: [],
      description: "",
      featured: false
    });
  }

  return (
    <div className="admin-page">
      <div className="admin-container">

        {/* FORM */}
        <div className="admin-left">
          <h2>{editingId ? "Editar Produto" : "Novo Produto"}</h2>

          <input
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Preço"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          {/* CATEGORIA */}
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Selecione categoria</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>

          <div className="inline">
            <input
              placeholder="Nova categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={addCategory}>+</button>
          </div>

          {/* DESCRIÇÃO */}
          <textarea
            placeholder="Descrição do produto..."
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* TAMANHOS */}
          <div className="section">
            <p>Tamanhos</p>

            <div className="inline">
              <input
                placeholder="Ex: P, 38, 57"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
              />
              <button onClick={addSize}>+</button>
            </div>

            <div className="tags">
              {form.sizes.map((s, i) => (
                <span key={i} onClick={() => removeSize(s)}>
                  {s} ✕
                </span>
              ))}
            </div>
          </div>

          {/* CORES */}
          <div className="section">
            <p>Cores</p>

            <div className="inline">
              <input
                placeholder="Nome (Branco)"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
              />

              <input
                type="color"
                value={colorValue}
                onChange={(e) => setColorValue(e.target.value)}
              />

              <button onClick={addColor}>+</button>
            </div>

            <div className="tags">
              {form.colors.map((c, i) => (
                <span key={i} onClick={() => removeColor(i)}>
                  <span
                    style={{
                      background: c.value,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: 5
                    }}
                  />
                  {c.name} ✕
                </span>
              ))}
            </div>
          </div>

          {/* IMAGENS */}
          <div className="section">
            <p>Imagens (máx 4)</p>
            <input type="file" multiple onChange={handleImages} />

            <div className="preview">
              {form.images.map((img, i) => (
                <img key={i} src={img} />
              ))}
            </div>
          </div>

          {/* FEATURED */}
          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
            />
            Mostrar na Home
          </label>

          <button className="save" onClick={addProduct}>
            {editingId ? "Atualizar Produto" : "Salvar Produto"}
          </button>
        </div>

        {/* LISTA */}
        <div className="admin-right">
          <h3>Produtos Criados</h3>

          {products.map((p) => (
            <div key={p.id} className="product-row">

              <img src={p.images?.[0]} alt="" />

              <div className="info">
                <p>{p.name}</p>
                <span>{p.category}</span>
                <small>R$ {p.price}</small>

                {p.featured && (
                  <div className="badge">Destaque</div>
                )}

                <div className="actions">
                  <button onClick={() => editProduct(p)}>
                    Editar
                  </button>

                  <button onClick={() => deleteProduct(p.id)}>
                    Excluir
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}