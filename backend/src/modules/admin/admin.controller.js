export function dashboard(request, response) {
  response.json({ message: 'Admin CMS placeholder', user: request.user });
}
