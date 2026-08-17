import { useState } from "react";
import style from "@/components/RegisterForm/RegisterForm.module.css";
import Link from "next/link";

const RegisterForm = () => {
    const [nome, setNome] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [emailUsuario, setEmailUsuario] = useState("");
    const [senhaUsuario, setSenhaUsuario] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/api/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    nomeUsuario,
                    emailUsuario,
                    senhaUsuario,
                    permissao: "user",
                }),
            });

            if (res.status === 201) {
                setMessage({ type: "success", text: "Cadastro realizado com sucesso." });
                setNome("");
                setNomeUsuario("");
                setEmailUsuario("");
                setSenhaUsuario("");
            } else {
                const data = await res.json().catch(() => ({}));
                setMessage({ type: "error", text: data.error || `Erro: status ${res.status}` });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Falha ao conectar com a API." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={style.loginContainer}>
                <img src="/Logo_texto.png" alt="Company Logo" className={style.formLogo} />

                <p className={style.formTitle}></p>
                <form onSubmit={handleSubmit} className={style.formRegister}>

                    <div className={style.inputWrapper}>
                        <input
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome completo"
                            className={style.inputField}
                            required
                        />

                     <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="FF6B6B"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>

                    </div>

                    <div className={style.inputWrapper}>
                        <input
                            name="nomeUsuario"
                            value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)}
                            type="text"
                            placeholder="Nome de Usuário"
                            className={style.inputField}
                            required
                        />

                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="FF6B6B"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h160q17 0 28.5 11.5T680-120q0 17-11.5 28.5T640-80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>

                    </div>

                    <div className={style.inputWrapper}>
                        <input
                            name="emailUsuario"
                            value={emailUsuario}
                            onChange={(e) => setEmailUsuario(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            className={style.inputField}
                            required
                        />
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z"/></svg>

                    </div>

                    <div className={style.inputWrapper}>
                        <input
                            name="senhaUsuario"
                            value={senhaUsuario}
                            onChange={(e) => setSenhaUsuario(e.target.value)}
                            type="password"
                            placeholder="Senha"
                            className={style.inputField}
                            required
                        />
                    
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="FF6B6B"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                     
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>

                {message && (
                    <p className={message.type === "error" ? style.errorMsg : style.successMsg}>
                        {message.text}
                    </p>
                )}

                <p className={style.signUp}>
                    Já possui uma conta? <Link href="/login"> Faça o seu login! </Link>
                </p>
            </div>
        </>
    );
};

export default RegisterForm;