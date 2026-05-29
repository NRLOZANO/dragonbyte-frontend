import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Graficos.css';

const Graficos = () => {
  const [graficos, setGraficos] = useState({ usuariosPorCurso: null, cursosMasPopulares: null });
  const [stats, setStats] = useState({ usuarios: null, cursos: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [g1, g2, s1, s2] = await Promise.all([
          api.get('/graficos/headless/usuarios-por-curso'),
          api.get('/graficos/headless/cursos-mas-populares'),
          api.get('/graficos/analisis/usuarios'),
          api.get('/graficos/analisis/cursos'),
        ]);
        setGraficos({ usuariosPorCurso: g1.data.imagen_base64, cursosMasPopulares: g2.data.imagen_base64 });
        setStats({ usuarios: s1.data, cursos: s2.data });
      } catch {
        setError('No se pudo cargar la información analítica. Verifica que el servicio de análisis esté activo.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="graficos-wrapper"><p className="graficos-loading">Cargando análisis...</p></div>;
  if (error) return <div className="graficos-wrapper"><p className="graficos-error">{error}</p></div>;

  return (
    <div className="graficos-wrapper">
      <h2 className="graficos-titulo">Analytics Dashboard</h2>

      <div className="graficos-grid">
        <div className="grafico-card">
          <h3>Top 5 Ciudades con más Usuarios</h3>
          {graficos.usuariosPorCurso && (
            <img src={`data:image/png;base64,${graficos.usuariosPorCurso}`} alt="Usuarios por ciudad" />
          )}
        </div>
        <div className="grafico-card">
          <h3>Dificultad de Cursos más Común</h3>
          {graficos.cursosMasPopulares && (
            <img src={`data:image/png;base64,${graficos.cursosMasPopulares}`} alt="Cursos más populares" />
          )}
        </div>
      </div>

      <div className="stats-grid">
        {stats.usuarios && (
          <div className="stats-card">
            <h3>Estadísticas de Usuarios</h3>
            <p>Edad promedio: <strong>{stats.usuarios.metricas_edad?.edad_promedio}</strong></p>
            <p>Usuario más joven: <strong>{stats.usuarios.metricas_edad?.usuario_mas_joven}</strong></p>
            <p>Usuario mayor: <strong>{stats.usuarios.metricas_edad?.usuario_mayor}</strong></p>
          </div>
        )}
        {stats.cursos && (
          <div className="stats-card">
            <h3>Estadísticas de Cursos</h3>
            <p>Promedio de niveles: <strong>{stats.cursos.promedio_niveles}</strong></p>
            <p>Dificultad más común: <strong>{stats.cursos.dificultad_mas_comun}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Graficos;
