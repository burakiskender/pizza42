using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Pizza42.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpGet]
        [Route("/api/menu")]
        [Authorize("read:menu")]
        public ActionResult Get()
        {
            var _menu = new string[] { "Margherita", "Americano", "Hawaiian", "Pepperoni" };
            return Ok(new { menu = _menu});
        }

        // POST api/values
        [HttpPost]
        [Route("/api/placeOrder")]
        [Authorize("create:orders")]
        public ActionResult Post([FromBody] string selectedItem)
        {
            Random generator = new Random();
            return Ok(new { orderId= generator.Next(0, 9999).ToString(), order = selectedItem});
        }


        [Authorize]
        [HttpGet("claims")]
        public object Claims()
        {
            return User.Claims.Select(c =>
            new
            {
                c.Type,
                c.Value
            });
        }
    }
}
