using Microsoft.AspNetCore.Mvc;
using myApi;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static List<User> users = new List<User>
        {
            new User
            {
                Code = 1,
                Name = "John",
                Address = "123 Main St",
                Email = "john@example.com",
                Password = "password123"
            },
            new User
            {
                Code = 2,
                Name = "Jane Smith",
                Address = "456 Oak St",
                Email = "jane@example.com",
                Password = "securepass"
            }
        };

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var user = users.Find(u => u.Code == id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] User user)
        {
            users.Add(user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User updatedUser)
        {
            var user = users.Find(u => u.Code == id);
            if (user == null)
            {
                return NotFound();
            }
            user.Name = updatedUser.Name;
            user.Address = updatedUser.Address;
            user.Email = updatedUser.Email;
            user.Password = updatedUser.Password;
            return NoContent();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = users.Find(u => u.Code == id);
            if (user == null)
            {
                return NotFound();
            }
            users.Remove(user);
            return NoContent();
        }
    }
}
