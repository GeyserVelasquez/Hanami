<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$apiKey = '7dcdb4bf5d1d1f24e860dc907f9b33e6';
$apiUrl = "https://api.themoviedb.org/3/trending/movie/week?api_key=$apiKey&language=es-ES";

try {
    $response = file_get_contents($apiUrl);
    if ($response === FALSE) {
        throw new Exception('Error al obtener datos de la API de TMDb');
    }
    $data = json_decode($response, true);
    if ($data === null) {
        throw new Exception('Error al decodificar los datos JSON');
    }
    $limitedData = array_slice($data['results'], 0, 30);
    $movies = array_map(function($movie) {
        return [
            'id' => $movie['id'],
            'title' => $movie['title'],
            'rating' => $movie['vote_average'],
            'image' => "https://image.tmdb.org/t/p/w500{$movie['poster_path']}"
        ];
    }, $limitedData);

    echo json_encode(['results' => $movies]);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>